---
title: Jr to Sr Developer
---

<p align="center">
  <img src="./jr2sr/roadmap.png" alt="Jr to Sr Course map" width="100%">
</p>

### Table of Contents

- [SSH](#ssh)
  - [Install SSH on Windows](#install-ssh-on-windows)
  - [SSH Service](#ssh-service)
  - [SSH Encryption](#ssh-encryption)
  - [SSH Commands](#ssh-commands)
  - [SSH on GitHub](#ssh-on-github)

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

### SSH Service

- &#x25A0; To start the service run **`Start-Service sshd`**
- &#x25A0; To get a running service run **`Get-Service sshd`**
- &#x25A0; And to stop the service run **`Stop-Service sshd`**

Alternatively, you can avoid manually starting by having it start on boot. You can run this command to do that.

```
Set-Service -Name sshd -StartupType 'Automatic'
```

The last thing to add are the firewall settings. You can set those with this command.

```
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH SSH Server' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

### SSH Encryption

<p align="center">
  <img src="./jr2sr/ssh.png" alt="SSH" width="75%">
</p>

There are 3 types of SSH Encryption.

- &#x25A0; **Symmetrical Encryption** - key based encryption. Anyone who has access to the key can read the data being sent. To exchange the key, there is a secure algorithm to scramble the key.

- &#x25A0; **Asymmetrical Encryption** - uses 2 separate keys to encrypt data, public and private. A machines public key can only be decrypted by that same machines private key. It is a one way relationship. SSH uses this type of encryption in the initial exchanging of public keys.

- &#x25A0; **Hashing** - computes a unique value for every input that is given. SSH hashes the final data sent, so that bad actors cannot become middle men and intercept messages.

- 1\. [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange)
- 2\. Arrive at Symmetric key
- 3\. Make sure no funny business
- 4\. Authenticate User

<p align="center">
  <img src="./jr2sr/encryption.gif" alt="Asymmetric Encryption" width="75%">
</p>

### SSH Commands

Full list of [SSH Commands](https://www.ssh.com/ssh/command/).

```
// access server
ssh USER_NAME@HOST_IP

// create key with type (-t) rsa, bit size (-b) and comment (-C)
ssh-keygen -t rsa -b 4096 -C 'email_address@email.com'

// add correct private key
ssh-add /.ssh/your_private_key
```

### SSH on GitHub

[Visual Guide for SSH setup on windows](https://github.com/antonykidis/Setup-ssh-for-github/blob/master/Setup-ssh-on-github.pdf)

- &#x25A0; Navigate to your GitHub settings.
- &#x25A0; Click SSH and GPG keys
- &#x25A0; Click New SSH Key
- &#x25A0; Create a title and paste in the **PUBLIC** key.
- &#x25A0; Click Add SSH key

The next step may vary based on what OS you are running. I am on Windows and followed these steps.

- &#x25A0; Open git bash terminal to directory I want to clone into.
- &#x25A0; Typed **`eval`\`ssh-agent -s`** to start up the ssh agent.
- &#x25A0; Then type **`ssh-add /.ssh/your_github_key`**.
- &#x25A0; Finally, type **`git clone git@github.com:username/repo`**

At last, SSH is setup and working for GitHub. Bruno is happy! 😄

---
