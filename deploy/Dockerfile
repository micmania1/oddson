# This docker file is for a custom docker container for us to run on CircleCI
# We need node, terrform and aws-cli installed on the same image in order to run ./deploy.sh
# in the same way that we would locally

# Install node
FROM node:12

# Install terraform
RUN curl -s https://releases.hashicorp.com/terraform/0.12.24/terraform_0.12.24_linux_amd64.zip -o terraform.zip
RUN unzip terraform.zip
RUN mv terraform /usr/local/bin/terraform
RUN rm terraform.zip

# Install aws-cli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

CMD ["/bin/sh"]
