yarn
if [ -f build.zip ]; then
    rm -rf build.zip
fi
yarn build
zip -r build.zip .next
gcloud compute scp --project="micro-enigma-235001" --zone="us-central1-a" --recurse ./build.zip passemall-home:/home/hiepnx27_gmail_com/abc-elearning.org.zip