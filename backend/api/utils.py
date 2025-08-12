from azure.storage.blob import generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta
import os

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_KEY")
CONTAINER_NAME = "point-images"

def generate_private_image_url(blob_name):
    sas_token = generate_blob_sas(
        account_name=ACCOUNT_NAME,
        container_name=CONTAINER_NAME,
        blob_name=blob_name,
        account_key=ACCOUNT_KEY,
        permission=BlobSasPermissions(read=True),
        expiry=datetime.now() + timedelta(hours=1)  # expires in 1 hour
    )
    return f"https://{ACCOUNT_NAME}.blob.core.windows.net/{CONTAINER_NAME}/{blob_name}?{sas_token}"
