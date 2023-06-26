// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use tokio_stream::StreamExt;
use reqwest::Client;
use std::path::PathBuf;
use asar::{AsarReader};

fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![
			is_writable,
			extract_dir_from_asar,
			extract_file_from_asar,
			get_file_size,
			download,
			close_bootstrapper,
		])
		.run(tauri::generate_context!())
		.expect("error while running tauri application")
}

// #[tauri::command]
// async fn read_asar(asar: String, file: String) -> std::result::Result<String, String> {
// 	let asar_file = tokio::fs::read(&asar).await.map_err(|e| e.to_string())?;
// 	let asar_path = Some(std::path::PathBuf::from(&asar));
// 	let asar = AsarReader::new(&asar_file, asar_path).map_err(|e| e.to_string())?;
//
// 	let path = PathBuf::from(file);
// 	let file = asar.files().get(&path).ok_or_else(|| {
// 		tokio::io::Error::new(
// 			tokio::io::ErrorKind::NotFound,
// 			format!("File not found: {:?}", path),
// 		)
// 	}.to_string())?;
//
// 	let contents = std::str::from_utf8(&file.data())
// 		.map(|s| s.to_owned())
// 		.map_err(|e| format!("{:?}", e))?;
//
// 	Ok(contents)
// }

#[tauri::command]
async fn close_bootstrapper(window: tauri::Window) {
	if let Some(bootstrapper) = window.get_window("bootstrapper") {
		bootstrapper.close().unwrap();
	}
	// Show main window
	window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
async fn is_writable(path: String) -> std::result::Result<bool, String> {
	use std::fs::OpenOptions;
	use std::io::Write;

	let temp_path = format!("{}/temp_{}", path, chrono::Utc::now().timestamp_millis());

	match OpenOptions::new().write(true).create_new(true).open(&temp_path) {
		Ok(mut file) => {
			if let Err(e) = file.write_all(b"test") {
				// Failed to write to the file
				return Err(e.to_string());
			}

			// Close and delete the file
			drop(file);
			if let Err(e) = std::fs::remove_file(&temp_path) {
				return Err(e.to_string());
			}

			Ok(true)
		}
		Err(_) => Ok(false),
	}
}

#[tauri::command]
async fn extract_dir_from_asar(asar_path: String, dir_path: String, output_path: String) -> std::result::Result<(), String> {
	// Read the Asar file into memory
	let asar_file = tokio::fs::read(&asar_path).await.map_err(|e| e.to_string())?;

	// Create an AsarReader from the bytes
	let asar = AsarReader::new(&asar_file, Some(PathBuf::from(&asar_path))).map_err(|e| e.to_string())?;

	// Iterate over the files in the Asar archive
	for (file_path, file) in asar.files() {
		// If the file's path starts with the directory path...
		if file_path.starts_with(&dir_path) {
			// Create the output file path
			let relative_path = file_path.strip_prefix(&dir_path).map_err(|e| e.to_string())?;
			let output_file_path = PathBuf::from(&output_path).join(relative_path);

			// Ensure the directory for the file exists
			if let Some(parent) = output_file_path.parent() {
				tokio::fs::create_dir_all(parent).await.map_err(|e| e.to_string())?;
			}

			// Write the file data to the output file
			let mut output_file = tokio::fs::File::create(&output_file_path).await.map_err(|e| e.to_string())?;
			output_file.write_all(&file.data()).await.map_err(|e| e.to_string())?;
		}
	}

	Ok(())
}

#[tauri::command]
async fn extract_file_from_asar(asar_path: String, file_path: String, output_path: String) -> std::result::Result<(), String> {
	// Read the Asar file into memory
	let asar_file = tokio::fs::read(&asar_path).await.map_err(|e| e.to_string())?;

	// Create an AsarReader from the bytes
	let asar = AsarReader::new(&asar_file, Some(PathBuf::from(&asar_path))).map_err(|e| e.to_string())?;

	// Find the file we're interested in within the Asar archive
	let path = PathBuf::from(&file_path);
	let file = asar.files().get(&path).ok_or_else(|| {
		format!("File not found: {:?}", path)
	})?;

	// Write the file data to the output file
	let mut output_file = tokio::fs::File::create(&output_path).await.map_err(|e| e.to_string())?;
	output_file.write_all(&file.data()).await.map_err(|e| e.to_string())?;

	Ok(())
}

#[tauri::command]
async fn get_file_size(path: String) -> std::result::Result<u64, String> {
	let metadata = tokio::fs::metadata(path).await.map_err(|e| e.to_string())?;
	Ok(metadata.len())
}

#[tauri::command]
async fn download(url: String, path: String) -> std::result::Result<(), String> {
	println!("Downloading file from {}", url);

	let client = Client::new();
	let mut resp = client.get(&url).send().await.map_err(|e| e.to_string())?.bytes_stream();

	let full_path = path.to_string();

	println!("Writing file to {}", full_path);

	let mut out = File::create(PathBuf::from(&full_path)).await.map_err(|e| e.to_string())?;

	while let Some(item) = resp.next().await {
		out.write_all(&item.map_err(|e| e.to_string())?).await.map_err(|e| e.to_string())?;
	}

	Ok(())
}
