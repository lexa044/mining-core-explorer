### Setup of https://mc-explorer.org on Ubuntu 16.04

    apt update
    apt upgrade
    apt install git python-software-properties software-properties-common nginx gcc g++ make
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    apt install -y nodejs
    npm install pm2 --global
    add-apt-repository ppa:certbot/certbot
    apt update
    apt upgrade
    apt install python-certbot-nginx
    
Copy content from [./mc-explorer.org.conf](./mc-explorer.org.conf) into `/etc/nginx/sites-available/mc-explorer.org.conf`

    certbot --nginx -d mc-explorer.org
    cd /etc/ssl/certs
    openssl dhparam -out dhparam.pem 4096
    cd 
    git clone https://github.com/lexa044/mining-core-explorer.git
    cd mining-core-explorer
    npm install
    pm2 start bin/www --name "mining-core-explorer"
