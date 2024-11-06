import React from 'react'
import { expect, $ } from '@wdio/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExampleComponent from './Component'

describe('React Component Tests', () => {
    it('should test component with Testing Library', async () => {
        render(<ExampleComponent />)
        const button = screen.getByText(/count is 0/i)

        expect(button).toBeInTheDocument()

        userEvent.click(button)
        userEvent.click(button)

        await waitFor(() => expect(screen.getByText(/count is 2/i)).toBeInTheDocument())
    })

    it('should test component with WebdriverIO', async () => {
        render(<ExampleComponent />)

        const button = await $('button*=count is')
        await expect(button).toBePresent()
        await expect(button).toHaveText('count is 0')

        await button.click()
        await button.click()

        await expect(button).toHaveText('count is 2')
    })

    it('should test component with WebdriverIO using $$', async () => {
        render(<ExampleComponent />)

        const buttons = await $$('button*=count is')
        await expect(buttons).toBeElementsArrayOfSize(1)
        await expect(buttons[0]).toHaveText('count is 0')

        await buttons[0].click()
        await buttons[0].click()

        await expect(buttons[0]).toHaveText('count is 2')
    })
})
