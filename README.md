# Testcase for broken reading from stream with IONOS s3

This testcase is to provide a reproducable testcase showing the implementation of s3 at IONOS does not work as expected.
This same testcase works on other providers, we tested against AWS and our own WX-ONE.

## configuration

create a file .ionosrc with the following content (adjust to your settings)

```
{
    "s3": {
        "bucket": "your bucket",
        "endPoint": "s3.eu-central-3.ionoscloud.com",
        "region": "eu-central-3",
        "port": 443,
        "useSSL": true,
        "accessKey": "your accesskey",
        "secretKey": "your secretkey"
    }
}
```
