import { render, screen } from '@testing-library/react';

import Input from './Input';

describe('Input Component', () => {
    test('renders label', () => {
        render(<Input label="Username" />);

        expect(
            screen.getByText('Username')
        ).toBeInTheDocument();
    });

    test('renders error message', () => {
        render(
            <Input
                label="Username"
                error="Required field"
            />
        );

        expect(
            screen.getByText('Required field')
        ).toBeInTheDocument();
    });

    test('renders required asterisk', () => {
        render(
            <Input
                label="Username"
                required
            />
        );

        expect(
            screen.getByText('*')
        ).toBeInTheDocument();
    });
});