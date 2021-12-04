package com.bartish.checkers;

import android.os.SystemClock;
import android.view.MotionEvent;
import com.bartish.checkers.field.FieldController;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static android.view.MotionEvent.ACTION_UP;

public class OnTouchTaskTest {
    private FieldController fieldController;
    private MotionEvent event;

    @Before
    public void init() {

    }

    @Test
    public void run() {
        fieldController = new FieldController(8, null);
        fieldController.getCheckers().setCheckerSize(10);
        fieldController.getDesk().setCellSize(10);
        event =
                MotionEvent.obtain(SystemClock.uptimeMillis(), SystemClock.uptimeMillis()+100,
                        ACTION_UP, 100, 100, 1);

        OnTouchTask onTouchTask = new OnTouchTask(event, fieldController);
        onTouchTask.run();
        Assert.assertNull(fieldController.getSelected());
    }
}