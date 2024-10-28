# EC2 Instance Commands

- `sudo apt-get update` - update instance dependencies
- `sudo apt-get upgrade` - upgrade instance dependencies
- `sudo apt-get install python3-full` - install python and commonly used packages i.e. venv / pip
- `python3 -m venv env` - create virtual environment called venv
- `source env/bin/activate` -  activate virtual environment
- `git clone {{ link to your repository }}` - clone the repository to the EC2 instance
- `pip3 install -r requirements.txt` - install requirements




- `sudo apt-get install -y nginx` -  install nginx
- `pip install gunicorn` - install gunicorn
- `sudo apt-get install supervisor` - install supervisor
- `cd /etc/supervisor/conf.d/` - change dir to supervisor dir
- `sudo touch gunicorn.conf` - create a gunicorn.conf file
- `sudo nano gunicorn.conf` - modify a gunicorn.conf
- `sudo mkdir /var/log/gunicorn` - create directory for log files
- `sudo supervisorctl reread` - check if gunicorn is available
- `sudo supervisorctl update` - update supervisor to use gunicorn
- `sudo supervisorctl status` - check the status of supervisor - SHOULD BE RUNNING
- do 2x `cd ..` to move to `/etc` directory
- `cd nginx`
- `sudo nano nginx.conf` - modify nginx configuration file
- modify line in file `user www-data` to be `user root` - change user to root to avoid permission errors
- `cd sites-available`
- `sudo touch django.conf` - create Django configuration file
- `sudo nano django.conf` - modify Django configuration file
- `sudo nginx -t` - test nginx configuration
- `sudo ln django.conf /etc/nginx/sites-enabled` - enable the website
- `sudo service nginx restart` - restart nginx to make it all work







### Sample gunicorn configuration
```
[program:gunicorn]
directory=/home/ubuntu/{{YOUR_PROJECT_NAME}}
command=/home/ubuntu/env/bin/gunicorn --workers 3 --bind unix:/home/ubuntu/{{YOUR_PROJECT_NAME}}/app.sock {{YOUR_PROJECT_SETTINGS_WSG_APPLICATION}}.wsgi:application  
autostart=true
autorestart=true
stderr_logfile=/var/log/gunicorn/gunicorn.err.log
stdout_logfile=/var/log/gunicorn/gunicorn.out.log

[group:guni]
programs:gunicorn
```





### Sample django conf no hhtps
```
server{

	listen 80;
	server_name {{IP_ADDRESS_OF_EC2_INSTANCE}};

	
	location / {

		include proxy_params;
		proxy_pass http://unix:/home/ubuntu/{{YOUR_PROJECT_NAME}}/app.sock;

	}

}
```

### Sample django conf https
```
server{

	listen 443;
	server_name {{YOUR_DOMAIN_NAME}};

	
	location / {

		include proxy_params;
		proxy_pass http://unix:/home/ubuntu/{{YOUR_PROJECT_NAME}}/app.sock;

	}

}
```