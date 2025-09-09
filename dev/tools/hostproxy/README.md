# Redirect Custom Domain to Localhost Port on Windows

This tutorial shows you how to make `http://example.test` resolve to `http://localhost:7465` on a Windows machine using:

- The `hosts` file for hostname resolution
- `netsh interface portproxy` for port forwarding

---

## Requirements

- Windows OS
- Administrator privileges
- A local server running on `http://localhost:7465`.
  You can obviously change the port to whatever you want, but this guide assumes you're using `7465`.

---

## Step 1: Choose a Loopback IP

Pick an unused IP in the `127.0.0.0/8` subnet. We'll use: `127.65.43.22`

This address behaves like `127.0.0.1` but can be mapped separately.

---

## Step 2: Modify the Hosts File

1. **Open Notepad as Administrator**
    - Press Start, search for Notepad, right-click → "Run as Administrator".

2. **Open the hosts file**:
   > `C:\Windows\System32\drivers\etc\hosts`

3. **Add this line to the bottom**:<br>
   > `127.65.43.22 example.test`

   This maps `example.test` to your chosen loopback IP.

4. **Save the file**

---

## Step 3: Set Up Port Forwarding with netsh

Open a Command Prompt **as Administrator** and run:

```cmd
netsh interface portproxy add v4tov4 listenport=80 listenaddress=127.65.43.22 connectport=7465 connectaddress=127.0.0.1
```

Here is a quick rundown:

- listenport=80: What the browser connects to (`http://example.test`)
- listenaddress=127.65.43.22: The mapped host IP
- connectport=7465: The actual port your server listens on
- connectaddress=127.0.0.1: The actual host your server binds to

Now `http://example.test` will proxy to `http://localhost:7465`. You can test this by accessing
> http://example.test

In your browser. It should show the same content as `http://localhost:7465`.
Please note that you should add the protocol (http://) before the domain (hostname) for this to work.
If your browser cached it once, it should work just fine though!

## Step 4: Managing the Setup (Remove, View)

### Remove the netsh Port Proxy

In an Administrator Command Prompt, run:

```cmd
netsh interface portproxy delete v4tov4 listenport=80 listenaddress=127.65.43.22
```

### Remove the Hosts Entry

Edit the hosts file again and delete the line:
> `127.65.43.22    example.test`

### How to View Existing Portproxy Rules

To see all current rules:

```cmd
netsh interface portproxy show all
```

### Where netsh Stores These Settings

The port proxy settings are stored in the Windows Registry at:
> HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\PortProxy\v4tov4\tcp

Each entry contains:

- Key: `listenaddress:listenport (e.g. 127.65.43.22:80)`
- Value: `connectaddress:connectport (e.g. 127.0.0.1:7465)`