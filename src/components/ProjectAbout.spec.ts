import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectAbout from './ProjectAbout.vue'

describe('ProjectAbout', () => {
  it('debe renderizar correctamente', () => {
    const wrapper = mount(ProjectAbout)
    expect(wrapper.exists()).toBe(true)
  })

  it('debe mostrar el título "About Us"', () => {
    const wrapper = mount(ProjectAbout)
    expect(wrapper.find('h1').text()).toBe('About Us')
  })

  it('debe mostrar el texto descriptivo', () => {
    const wrapper = mount(ProjectAbout)
    expect(wrapper.find('p').text()).toBe('We are normal people')
  })

  it('debe tener la estructura HTML esperada', () => {
    const wrapper = mount(ProjectAbout)
    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
  })
})
