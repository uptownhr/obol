# ssh-access-management
Centralized server to management ssh access to servers

If you are a developer, chances are that you management multiple servers and you give access to other developers. Normally, this is done through the developers sharing their public key and adding them to the authorized_keys file. 

1. A friend/dev needs access
2. You ask for their pub key
3. Pub key is sent to you through slack/email/txt
4. You ssh in and add the ssh key to the authorized_keys file

We will simplify this process by creating a service that manages the authorized_keys file on all your servers. Now once you have their pub key, you can simply give access to 1 server or multiple servers through a simple control panel.


New proposed steps

1. A friend/dev needs access
2. You ask them to login and upload their pub key once
3. Once their user is created, you can now give that pub key access to multiple servers.
