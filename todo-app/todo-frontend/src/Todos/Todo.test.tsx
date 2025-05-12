// Todo.test.tsx
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from './Todo'
import React from 'react'

const mockTodo = {
  text: 'Test todo item',
  done: false
}

describe('Todo 组件测试', () => {
  test('正确渲染未完成状态', () => {
    const mockDelete = vi.fn()
    const mockComplete = vi.fn()

    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockDelete}
        onClickComplete={mockComplete}
      />
    )

    // 验证主要文本内容
    expect(screen.getByText('Test todo item')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    
    // 验证按钮存在
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Set as done' })).toBeInTheDocument()
  })

  test('正确渲染已完成状态', () => {
    const doneTodo = { ...mockTodo, done: true }
    
    render(
      <Todo
        todo={doneTodo}
        onClickDelete={vi.fn()}
        onClickComplete={vi.fn()}
      />
    )

    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Set as done' })).toBeNull()
  })

  test('点击删除按钮触发回调', async () => {
    const user = userEvent.setup()
    const mockDelete = vi.fn()

    render(
      <Todo
        todo={mockTodo}
        onClickDelete={mockDelete}
        onClickComplete={vi.fn()}
      />
    )

    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    await user.click(deleteButton)

    expect(mockDelete).toHaveBeenCalledTimes(1)
    expect(mockDelete).toHaveBeenCalledWith(mockTodo)
  })

  test('点击完成按钮触发回调', async () => {
    const user = userEvent.setup()
    const mockComplete = vi.fn()

    render(
      <Todo
        todo={mockTodo}
        onClickDelete={vi.fn()}
        onClickComplete={mockComplete}
      />
    )

    const completeButton = screen.getByRole('button', { name: 'Set as done' })
    await user.click(completeButton)

    expect(mockComplete).toHaveBeenCalledTimes(1)
    expect(mockComplete).toHaveBeenCalledWith(mockTodo)
  })
})