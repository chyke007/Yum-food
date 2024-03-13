#!/bin/bash
AWS_REGION="us-east-1"
KEY_NAME="MyKeyPair"
KEY_PAIR_ID=$(aws ec2 describe-key-pairs  --region "$AWS_REGION" --query "KeyPairs[?KeyName=='$KEY_NAME'].KeyPairId" --output text)
# Set the SSM parameter name where the SSH private key is stored
PARAMETER_NAME="/ec2/keypair/$KEY_PAIR_ID"
# Set the output file name for the .pem file
OUTPUT_FILE="/home/ubuntu/.ssh/ssh_key.pem"
# Retrieve the SSH private key from SSM Parameter Store
SSH_PRIVATE_KEY=$(aws ssm get-parameter --region "$AWS_REGION" --name "$PARAMETER_NAME" --with-decryption --query "Parameter.Value" --output text)
# Save the SSH private key to a .pem file
echo "$SSH_PRIVATE_KEY" > "$OUTPUT_FILE"
# Set the correct file permissions for the .pem file
chmod 400 "$OUTPUT_FILE"