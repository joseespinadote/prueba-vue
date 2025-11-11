import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: { template: 'Home' }
    },
    {
      path: '/about',
      component: { template: 'About' }
    }
  ]
})

describe('App', () => {
  it('debe renderizar correctamente', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('debe tener el contenedor principal con id "app"', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('#app').exists()).toBe(true)
  })

  it('debe mostrar la barra de navegación', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('debe tener enlaces de navegación a Items y About', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    const links = wrapper.findAll('nav a')
    expect(links.length).toBe(2)
    expect(links[0].text()).toBe('Items')
    expect(links[1].text()).toBe('About')
  })

  it('debe tener router-links con las rutas correctas', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    const links = wrapper.findAll('nav a')
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/about')
  })

  it('debe tener router-view para renderizar componentes', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: {
          RouterView: { template: '<div>Router View</div>' }
        }
      }
    })

    expect(wrapper.html()).toContain('Router View')
  })
})
