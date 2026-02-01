import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ModalHeader, ModalDescription } from '../index';

describe('Modal', () => {
  it('renders when open', () => {
    render(
      <Modal open={true} onDismiss={() => {}}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onDismiss={() => {}}>
        <p>Modal content</p>
      </Modal>
    );

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onDismiss when clicking overlay', () => {
    const onDismiss = vi.fn();
    render(
      <Modal open={true} onDismiss={onDismiss} testId="modal">
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('calls onDismiss on Escape key', () => {
    const onDismiss = vi.fn();
    render(
      <Modal open={true} onDismiss={onDismiss}>
        <p>Modal content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('supports legacy isOpen/onClose props', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Legacy props</p>
      </Modal>
    );

    expect(screen.getByText('Legacy props')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('ModalHeader', () => {
  it('renders icon and title', () => {
    render(<ModalHeader icon={<span data-testid="icon">🔔</span>} title="Test Title" />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});

describe('ModalDescription', () => {
  it('renders children', () => {
    render(<ModalDescription>Description text</ModalDescription>);

    expect(screen.getByText('Description text')).toBeInTheDocument();
  });
});
