import os
import sys
import zipfile
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MONGO_DIR = ROOT / "mongodb"
BIN_DIR = MONGO_DIR / "bin"
DATA_DIR = MONGO_DIR / "data"
MONGOD_EXE = BIN_DIR / "mongod.exe"

URL = "https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.14.zip"
ZIP_FILE = MONGO_DIR / "mongo.zip"

def setup():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    BIN_DIR.mkdir(parents=True, exist_ok=True)

    if MONGOD_EXE.exists():
        print(f"[OK] MongoDB binary already exists at {MONGOD_EXE}")
        return

    print(f"Downloading MongoDB 7.0.14 from {URL}...")
    def reporthook(blocknum, blocksize, totalsize):
        if totalsize > 0:
            percent = blocknum * blocksize * 100 / totalsize
            if blocknum % 1000 == 0 or percent >= 100:
                print(f"  Downloaded {blocknum * blocksize / (1024*1024):.1f} MB / {totalsize / (1024*1024):.1f} MB ({min(100, percent):.1f}%)", flush=True)

    urllib.request.urlretrieve(URL, ZIP_FILE, reporthook=reporthook)
    print("Download complete. Extracting mongod.exe...")

    with zipfile.ZipFile(ZIP_FILE, 'r') as z:
        for member in z.namelist():
            if member.endswith("mongod.exe"):
                # Extract file contents directly into BIN_DIR / "mongod.exe"
                with z.open(member) as source, open(MONGOD_EXE, "wb") as target:
                    target.write(source.read())
                print(f"Extracted {member} -> {MONGOD_EXE}")
                break

    if ZIP_FILE.exists():
        ZIP_FILE.unlink()
        print("Cleaned up temporary zip archive.")

    if MONGOD_EXE.exists():
        print(f"[SUCCESS] MongoDB 7 mongod.exe is ready at {MONGOD_EXE}")
    else:
        print("[ERROR] Failed to extract mongod.exe from archive.")
        sys.exit(1)

if __name__ == "__main__":
    setup()
