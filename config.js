/* ALERT
 *
 * Please do commit this file or any secret keys to GitHub
 *
 */


module.exports = {
  port: process.env.PORT || 3000,
  mongodb: process.env.MONGODB || 'mongodb://localhost:27017/obol',
  redis: process.env.REDIS || 'redis://localhost:6379',
  secret: 'asdfasdfzcvzxcv',
  payment: {
    stripe:{
      public_key: 'pk_test_8iCRH4xJXGEWYt4DkbECYDM8',
      secret_key: 'sk_test_9yjqifpcg5f0PlJDEIHQWGRm',
    }
  },
  social:{
    facebook:{
      client_id: process.env.FACEBOOK_CLIENT_ID || '507223992817678',
      client_secret: process.env.FACEBOOK_CLIENT_ID || '029377e578b512892b3fc8f295474b84' 
    },
    twitter:{
      consumer_key: process.env.TWITTER_CONSUMER_KEY || 'Jw6gdI0TGsuFzGq9ClIoqWuHu',
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET || 'rQnElaPgiUUixe0viJ0dbd1M70RpO2a7P2R07pVEk4MPbxBxK7'
    },
    instagram:{
      client_id: process.env.INSTAGRAM_CLIENT_ID || 'b57a31bedd2f47449456558a53d127e3',
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET || 'ee3b706754584de19b31ca95c670caec'
    },
    github:{
      client_id: process.env.GITHUB_CLIENT_ID || '5ad4d0cb91ff2b92cfe6',
      client_secret: process.env.GITHUB_CLIENT_SECRET || 'afc05eda09ad695793f32d5ecb9c5a369a6333af'
    },
    google:{
      client_id: process.env.GOOGLE_CLIENT_ID || '594900274152-pjsvjn95m0afhg65j0iv9smrrj7umd3k.apps.googleusercontent.com',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || 'h8UXTLXGkBw6hSa9AXB-1-y3'
    }
  }
}
