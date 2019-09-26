import store from '@/store'
import { debounce } from '@/utils'

const { body } = document
const DESKTOP_WIDTH = 992
const TABLET_WIDTH = 768

export const resizeMixin = {
  watch: {
    $route (route) {
      if (this.settings.device === 'mobile' && this.settings.openSideMenu) {
        let settings = { ...this.settings }
        settings.withoutAnimation = false
        settings.openSideMenu = false
        store.dispatch('setSettings', settings)
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', debounce(this.$_resizeHandler, 400))
  },
  beforeDestroy () {
    window.removeEventListener('resize', debounce(this.$_resizeHandler, 400))
  },
  mounted () {
    this.$_resizeHandler()
  },
  methods: {
    $_isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < TABLET_WIDTH
    },
    $_isDesktop () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 >= DESKTOP_WIDTH
    },
    $_resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        const isDesktop = this.$_isDesktop()
        let settings = { ...this.settings }
        if (settings.device !== isMobile) {
          settings.device = isMobile ? 'mobile' : isDesktop ? 'desktop' : 'tablet'
        }
        if (isMobile) {
          settings.withoutAnimation = true
          settings.openSideMenu = false
        }
        if (isDesktop) {
          settings.withoutAnimation = true
          settings.openSideMenu = true
        }
        store.dispatch('setSettings', settings)
      }
    }
  }
}
