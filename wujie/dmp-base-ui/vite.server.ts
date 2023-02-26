// import deny from './vite.deny'

export default {
  port: 8000,
  cors: true,
  fs: {
    strict: true,
    // deny
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://10.28.89.10:8765',
  //     changeOrigin: true
  //   },
  //   '/api/rules/regulations': {
  //     target: "http://10.28.89.10:8765",
  //     changeOrigin: true,
  //     secure: false,
  //     // eslint-disable-next-line no-shadow
  //     rewrite: (path) => path.replace('/api/rules/regulations', '')
  //   },
  //   '/api/fs':{
  //     target: "http://10.28.89.10:8765",
  //     changeOrigin: true
  //   },
  //   '/api/admin/system': {
  //     target: "http://10.28.89.10:8765", // 测试ip地址
  //     changeOrigin: true,
  //     secure: false,
  //     // eslint-disable-next-line no-shadow
  //     // rewrite: (path) => path.replace('/api', '')
  //   },
  //   //之前的综合管理的接口
  //   '/api/admin': {
  //       target: "http://10.28.89.10:8765",
  //       //target: "http://11.11.141.59:30002", // 测试ip地址
  //       changeOrigin: true,
  //       secure: false,
  //       // eslint-disable-next-line no-shadow
  //       // rewrite: (path) => path.replace('/api', '')
  //   },

  //   '/api/pedestal': {
  //     target: "http://11.11.141.49:9717",
  //     // target: "http://10.28.89.10:8765",
  //     changeOrigin: true,
  //     secure: false,
  //     // rewrite: (path) => path.replace('/api/pedestal', '')
  //   },
  //   '/dmpp/api': {
  //     // target: "http://11.11.141.49:9717",
  //     target: "http://10.28.87.33:30719",
  //     changeOrigin: true,
  //     secure: false,
  //     rewrite: (path) => path.replace('/dmpp/api', '/api')
  //   },
  //   '/api/application': {
  //     // target: "http://10.122.165.27:30717",
  //     // target: "http://10.122.164.203:8020",
  //     target: "http://10.28.89.10:8765",
  //     changeOrigin: true,
  //     secure: false,
  //     // eslint-disable-next-line no-shadow
  //     rewrite: (path) => path.replace('/api/application', '')
  //   },
  //   '/api/cmp/bonus': {
  //     // target: "http://10.122.164.203:9233",
  //     //target: "http://10.28.89.10:8765",
  //     target: "http://11.11.141.59:30002",
  //     changeOrigin: true,
  //     secure: false,
  //     rewrite: (path) => path.replace('', '')
  //   }
  // }
}
