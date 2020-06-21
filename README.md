
## To provide infrastructure for virtual devices from Virtual Thing Generator


Using EC2 AWS Ubuntu 18.04 LTS (t2.micro)

Installing nodejs

```

$ cd ~

$ curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

$ sudo bash nodesource_setup.sh

$ sudo apt install nodejs

$ sudo apt install build-essential
```

Provinding Thingweb project

```
$ sudo apt install git

$ git clone https://github.com/eclipse/thingweb.node-wot

$ cd thingweb.node-wot

$ npm install

$ npm run build
```


Use SCP command for copying files generate from Virtual Thing Generator.


Executing virtual device

```
$ node packages/cli/dist/cli.js examples/scripts/deviceX.js
```

Script Executing nodes. Creating file activevirtualthing.sh.

```
$nano ~/activevirtualthing.sh
```

Input these commands into activevirtualthing.sh

```
#!/bin/bash
cd ~/thingweb.node-wot/
node packages/cli/dist/cli.js ~/*.js
```

Executing the command:

```
$ sudo chmod +x ~/activevirtualthing.sh
```
$ crontab -e
```

And then

```
@reboot ~/activevirtualthing.sh
```
