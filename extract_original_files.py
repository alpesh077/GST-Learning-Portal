# extract_original_files.py
import json
import os

transcript_path = r"C:\Users\Alpesh\.gemini\antigravity\brain\ccd346cd-9cb7-483e-946a-746440c24c12\.system_generated\logs\transcript_full.jsonl"
dest_folder = r"d:\Users\Alpesh\business\9. PORTFOLIO\PORTFOLIO\assets\Projects\PROJECT.3 GST AND IT FIILLING\frontend"

# We will parse the transcript file
print("Reading transcript to extract original files...")
extracted = {}

with open(transcript_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        try:
            data = json.loads(line)
            # Check if this step is a VIEW_FILE tool result
            # A tool result has "type" = "VIEW_FILE" or "type" = "LIST_DIRECTORY" etc.
            # In the transcript, tool_calls exist in PLANNER_RESPONSE, and the result is in a separate step.
            # Let's inspect if the type is VIEW_FILE or similar, or check if the content contains the file path
            content = data.get("content", "")
            if not content:
                continue
                
            if "File Path:" in content or "Showing lines" in content:
                # Find the file path from the content
                lines = content.split("\n")
                filepath_line = [l for l in lines if "File Path:" in l]
                if filepath_line:
                    # Extract path: e.g. File Path: `file:///d:/Users/Alpesh/...`
                    fpath = filepath_line[0].split("`")[1]
                    if fpath.startswith("file:///"):
                        fpath = fpath.replace("file:///", "")
                    # Convert to normal windows path
                    fpath = fpath.replace("/", "\\")
                    
                    # Extract actual content
                    # The content usually has headers like:
                    # Created At: ...
                    # Completed At: ...
                    # File Path: ...
                    # Total Lines: ...
                    # Total Bytes: ...
                    # Showing lines ... to ...
                    # The following code has been modified to include a line number...
                    # Or it might be the raw contents
                    # Let's find where the file content starts.
                    # It starts after "Original code" or similar, or it has line numbers.
                    # In our view_file tool output, it has "1: ... \n 2: ..."
                    # Let's write a parser to strip line numbers if they exist
                    content_lines = []
                    start_collecting = False
                    for l in lines:
                        if "include a line number before every line" in l or "Original code should remove" in l:
                            start_collecting = True
                            continue
                        if start_collecting:
                            # Parse line number like "1: <html>" -> "<html>"
                            # Match group "1: "
                            parts = l.split(":", 1)
                            if len(parts) == 2 and parts[0].strip().isdigit():
                                content_lines.append(parts[1][1:]) # strip the space after colon
                            else:
                                if l.strip() == "The above content shows the entire, complete file contents" or l.strip() == "The above content does NOT show the entire file contents":
                                    break
                                content_lines.append(l)
                    
                    file_text = "\n".join(content_lines)
                    extracted[fpath] = file_text
                    print(f"Extracted {fpath} ({len(file_text)} chars)")
        except Exception as e:
            pass

# Save extracted files back to their original paths if they are HTML files
for fpath, text in extracted.items():
    basename = os.path.basename(fpath)
    if basename.endswith(".html"):
        dest_path = os.path.join(dest_folder, basename)
        with open(dest_path, "w", encoding="utf-8") as out:
            out.write(text)
        print(f"Restored original file: {dest_path}")

print("Extraction complete.")
