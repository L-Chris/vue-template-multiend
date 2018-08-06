const config = {
  base: {},
  dev: {
    baseURL: '/mock/admin',
    assetsPublicPath: '/static',
    routePublicPath: ''
  },
  build: {
    baseURL: '/admin',
    assetsPublicPath: '/resource/admin/',
    routePublicPath: '/admin/show'
  }
}

export default process.env.NODE_ENV === 'production' ? config.build : config.dev
