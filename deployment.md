1. Launch EC2 instance
Log in to management console
go to ec2 dashboard
click on launch instance
chose Ubuntu
instance type(free tier) and configure other settings
launch the interface

2. Associate your static ip address to your machine -> Go to actions click on associate elastic ip address -> Default options click associate.

3. Click on ec2 instance, and click connect or open terminal in your PC, gp tp folder where the RSA key was downloaded and paste the commands as mentioned to connect to the ec2 instance from terminal locally.

4. Update Ubuntu
sudo apt update
sudo apt upgrade

5. install node js
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt-get install -y nodejs

6. Create express application
    in /home/Ubuntu - 
        -> mkdir my-express-app
        -> cd my-express-app
        -> npm init -y

7. Challenge in deployment
    -> Static public address
    -> reliable - SLA should be near to 100%, replica instances -> 1 master and 3 slaves
    -> low latency
    -> Scalability -> Scaler might need minimum instances during the day and maximum instances during the night
    -> Backup
    -> Cost
