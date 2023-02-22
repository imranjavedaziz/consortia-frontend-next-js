import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
});

const myBucket = new AWS.S3({
  params: {
    Bucket: true
      ? process.env.NEXT_PUBLIC_UNLOCKABLE_BUCKET_NAME
      : process.env.NEXT_PUBLIC_BUCKET_NAME,
  },
  region: process.env.NEXT_PUBLIC_BUCKET_REGION,
});

export function ExtractPrivateFileFromAws(link) {
  console.log('link', link)
  if(link){
myBucket.getSignedUrl(
    {
      Bucket: process.env.NEXT_PUBLIC_UNLOCKABLE_BUCKET_NAME,
      Key: link,
    },
    async (err, data) => {
      if (err) {
        console.log(err,'aws-error');
      } else {
        console.log('raw data', data)
        const file = data.Body;
        const blob = new Blob([file], { type: data.ContentType });
        const url = URL.createObjectURL(blob);
        console.log('url', url)
        return url
      }
    }
  );
  }
  
}
