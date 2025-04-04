import React from 'react';
import { render, screen } from '@testing-library/react';
import PickerPage from '../PickerPage';
import { describe, it, expect } from 'vitest'; // Import from 
import '@testing-library/jest-dom/vitest'; // Import jest-dom matchers

describe(PickerPage, () => {
    // Testing passing props from FinalDisplay to PickerPage
    it('Displays Jacket in H2', () => {
        render(<PickerPage suiteCategory={"Jacket"} />)
        const headingElement = screen.getByRole('heading', { level: 2 })
        expect(headingElement).toBeInTheDocument();
        expect(headingElement).toHaveTextContent('Jacket')
    });

    it("Pass data into handleDisplayDataChange to get results", () => {
        const data = [
            { id: 'testingid', url: 'testingurl', note: "testing note" }
        ]

        const handleDisplayDataChange = (data) => {
            // Mock implementation of the function
            console.log("Data changed:", data);
        };

        render(<PickerPage suiteCategory={"Jacket"} onDataChange={handleDisplayDataChange(data)} />)

    })
});
// 