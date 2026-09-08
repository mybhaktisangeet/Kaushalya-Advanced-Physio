import os
import sys
import time
import socket
import subprocess
import signal
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MONGO_DIR = ROOT / "mongodb"
DATA_DIR = MONGO_DIR / "data"
MONGOD_EXE = MONGO_DIR / "bin" / "mongod.exe"
VENV_PYTHON = ROOT / "backend" / "venv" / "Scripts" / "python.exe"

def is_port_open(host: str, port: int) -> bool:
    try:
        with socket.create_connection((host, port), timeout=1):
            return True
    except (socket.timeout, ConnectionRefusedError, OSError):
        return False

def wait_for_port(host: str, port: int, timeout: int = 30) -> bool:
    start = time.time()
    while time.time() - start < timeout:
        if is_port_open(host, port):
            return True
        time.sleep(0.5)
    return False

def main():
    processes = []
    
    try:
        # 1. Start MongoDB if not already running on port 27017
        if is_port_open("127.0.0.1", 27017):
            print("[INFO] MongoDB is already running on port 27017.")
        else:
            if not MONGOD_EXE.exists():
                print(f"[ERROR] mongod.exe not found at {MONGOD_EXE}. Please run setup_mongo.py first.")
                sys.exit(1)
            DATA_DIR.mkdir(parents=True, exist_ok=True)
            print("[1/3] Starting MongoDB server on 127.0.0.1:27017...")
            log_file = open(MONGO_DIR / "mongo.log", "a", encoding="utf-8")
            mongo_proc = subprocess.Popen(
                [str(MONGOD_EXE), "--dbpath", str(DATA_DIR), "--port", "27017", "--bind_ip", "127.0.0.1"],
                stdout=log_file,
                stderr=subprocess.STDOUT
            )
            processes.append(("MongoDB", mongo_proc))
            if not wait_for_port("127.0.0.1", 27017, timeout=20):
                print("[ERROR] MongoDB failed to start on port 27017.")
                sys.exit(1)
            print("[OK] MongoDB is running.")

        # 2. Start Backend FastAPI server
        if is_port_open("127.0.0.1", 8001):
            print("[INFO] Backend is already running on port 8001.")
        else:
            print("[2/3] Starting Backend (FastAPI) on http://localhost:8001...")
            backend_dir = str(ROOT / "backend")
            backend_cmd = [
                str(VENV_PYTHON), "-m", "uvicorn", "server:app",
                "--host", "127.0.0.1", "--port", "8001", "--reload"
            ]
            backend_proc = subprocess.Popen(backend_cmd, cwd=backend_dir)
            processes.append(("Backend", backend_proc))
            if not wait_for_port("127.0.0.1", 8001, timeout=25):
                print("[ERROR] Backend failed to start on port 8001.")
                sys.exit(1)
            print("[OK] Backend is running at http://localhost:8001.")

        # 3. Start Frontend React server
        if is_port_open("127.0.0.1", 3000):
            print("[INFO] Frontend is already running on port 3000.")
        else:
            print("[3/3] Starting Frontend (React) on http://localhost:3000...")
            frontend_dir = str(ROOT / "frontend")
            frontend_cmd = ["cmd.exe", "/c", "npx", "yarn", "start"]
            frontend_proc = subprocess.Popen(frontend_cmd, cwd=frontend_dir)
            processes.append(("Frontend", frontend_proc))
            if not wait_for_port("127.0.0.1", 3000, timeout=60):
                print("[WARN] Frontend took longer than 60s to start. It may still be compiling.")
            else:
                print("[OK] Frontend is running at http://localhost:3000.")

        print("\n" + "="*60)
        print(" Kaushalya Advanced Physio Platform is running locally!")
        print("  - Frontend: http://localhost:3000")
        print("  - Backend:  http://localhost:8001")
        print("  - API Docs: http://localhost:8001/api/docs")
        print(" Press Ctrl+C at any time to stop all services.")
        print("="*60 + "\n")

        # Keep alive until Ctrl+C
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\nStopping services...")
    finally:
        for name, proc in reversed(processes):
            print(f"Stopping {name} (PID {proc.pid})...")
            try:
                proc.terminate()
                proc.wait(timeout=3)
            except Exception:
                try:
                    proc.kill()
                except Exception:
                    pass
        print("[OK] All services stopped.")

if __name__ == "__main__":
    main()
