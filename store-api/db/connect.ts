import mongoose from 'mongoose';

export default function (url: string | undefined) {
  if (url) {
    return mongoose.connect(url);
  } else {
    throw new Error('url is not defined. Check your envs');
  }
}

