package com.oop.task3

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.view.View
import kotlin.math.min

class BoardView(context: Context?, attrs: AttributeSet?) : View(context, attrs) {
    private val cellCount = 8
    private val lightColor = Color.parseColor("#EEEEEE")
    private val darkColor = Color.parseColor("#BBBBBB")


    private var boardSize = 0.0f
    private var cellSize = 0.0f
    private var originX = 0.0f
    private var originY = 0.0f
    private var board = Array(cellCount) { Array(cellCount) { Cell.EMPTY } }
    private var paint = Paint()

    override fun onDraw(canvas: Canvas?) {
        canvas ?: return

        boardSize = min(width, height).toFloat()
        cellSize = boardSize / cellCount
        originX = (width - boardSize) / 2f
        originY = (height - boardSize) / 2f

        drawBoard(canvas)
    }

    private fun drawBoard(canvas: Canvas) {
        fun drawCell(col: Int, row: Int, isDark: Boolean) {
            paint.color = if (isDark) darkColor else lightColor
            canvas.drawRect(
                originX + col * cellSize, originY + row * cellSize,
                originX + (col+1) * cellSize, originY + (row+1) * cellSize,
                paint
            )
        }

        for (col in 0..cellCount) {
            for (row in 0..cellCount) {
                drawCell(col, row, (col + row) % 2 == 1)
            }
        }
    }
}