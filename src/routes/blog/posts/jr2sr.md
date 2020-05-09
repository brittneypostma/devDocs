---
title: The Complete Junior to Senior Developer
---

<p align="center">
  <img src="./jr2sr/roadmap.png" alt="Jr to Sr Course map" width="100%">
</p>

### Table of Contents

- [SSH](#ssh)
  - [Install SSH on Windows](#install-ssh-on-windows)
    - [SSH Service](#ssh-service)

---

## SSH

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSH or **Secure Shell** is a type of protocol that allows machines to communicate each other. There are many types of protocols such as http, https, ftp, ip, and others. SSH is just another type that secures the connection between a clint and a server. It was created as a way to encrypt data that is sent over a connection, so that bad actors cannot monitor it. You can access ssh by using this command:

```
ssh {user}@{host}
```

The **user** is the account you want to access and the **host** is the computer you want to access. But first, we need to install SSH if you are using Windows.

### Install SSH on Windows

- Click the start menu and search for Manage Optional Features.
- Click Add a Feature.
- Search for OpenSSH and install it.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SSH should not be installed on Windows, but there are a few more things to know. The following commands work inside Powershell when it is ran as an administrator.

```
// Run this command to show the name and state of OpenSSH.

Get-WindowsCapability -Online | ? Name -like 'OpenSSH*'

// It should print out a message like this.

Name : OpenSSH.Client~~~~0.0.1.0
State : Installed

Name : OpenSSH.Server~~~~0.0.1.0
State : Installed

// If the server is NotPresent instead of Installed,
// add it with this command.

Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

#### SSH Service

- To start the service run **`Start-Service sshd`**
- To get a running service run **`Get-Service sshd`**
- And to stop the service run **`Stop-Service sshd`**

Alternatively, you can avoid manually starting by having it start on boot. You can run this command to do that.

```
Set-Service -Name sshd -StartupType 'Automatic'
```

The last thing to add are the firewall settings. You can set those with this command.

```
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH SSH Server' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```
