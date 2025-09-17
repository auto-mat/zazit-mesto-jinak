#!/usr/bin/env bash

sudo apt-get update -y
sudo apt-get install -y --no-install-recommends --no-install-suggests\
     software-properties-common apt-transport-https curl \
     ca-certificates wget

# Add Google Chrome browser repository
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub \
    | sudo gpg --dearmour -o /usr/share/keyrings/google_linux_signing_key.gpg
sudo sh -c '''
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/google_linux_signing_key.gpg] \
http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
'''

# Add MS Edge browser repository
wget -q -O - https://packages.microsoft.com/keys/microsoft.asc \
    | sudo gpg --dearmour -o /usr/share/keyrings/microsoft_linux_signing_key.gpg
sudo sh -c '''
echo \
"deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft-edge.gpg] \
https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge.list
'''

# Add Mozilla Firefox repository
sudo add-apt-repository ppa:mozillateam/ppa
sudo sh -c '''
echo \
"Package: firefox*
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 501" > /etc/apt/preferences.d/mozillateamppa
'''

sudo apt-get update -y
sudo apt-get install -y --no-install-recommends --no-install-suggests \
     firefox microsoft-edge-stable google-chrome-stable
