# -*- coding: utf-8 -*-
"""
Newton interpolation and numerical differentiation
Created on Sun Apr 10 01:22:46 2011
@author: vene
"""
from __future__ import division
from copy import copy

import matplotlib
import numpy as np
import matplotlib.pyplot as pl


def F(points):
    """Iterative batch computation of the Newton divided differences"""
    x = points.keys()
    F = points.values()
    for i in range(1, len(points)):
        Fprev = copy(F)
        for j in range(i, len(points)):
            F[j] = (Fprev[j] - Fprev[j - 1]) / (x[j] - x[j - i])
    return F


class NewtonInterpolation():
    """Newton interpolation
    Callable object that evaluates Newton's interpolation polynomial
    or its derivative (if `prime=True`), at a given point.
    Parameters:
    -----------
    points: dictionary
        Points to interpolate (x => y)
    """

    def __init__(self, points):
        self.points = points
        self.F = F(points)

    def __call__(self, x, prime=False):
        n = len(self.points)
        xes = np.array(self.points.keys())
        if not prime:
            result = self.F[0]
            for i in range(1, n):
                result += self.F[i] * (x - xes[:i]).prod()
        else:
            result = self.F[1]
            for i in range(2, n):
                s = 0
                for j in range(i):
                    s += (x - np.concatenate((xes[:j], xes[j + 1:i]))).prod()
                result += self.F[i] * s
        return result


def get_xs(interval, n_points, random=False):
    """Split an interval in n points randomly or equidistantly"""
    a, b = interval
    if random == False:
        return np.linspace(*interval, num=n_points)
    elif isinstance(random, int) or random == None:
        random = np.random.mtrand.RandomState(random)
        return a + (b - a) * random.dirichlet(np.ones(n_points))


def differentiate(f, interval, n_points, random=False):
    fig = pl.figure()
    points = {i: f(i) for i in get_xs(interval, n_points, random)}
    n = NewtonInterpolation(points)
    ticks = np.linspace(*interval, num=100)
    pl.plot(ticks, f(ticks), 'r-')  # original function
    pl.plot(ticks, [n(i) for i in ticks], 'g-')  # Newton approximation
    for p in points.keys():  # points for interpolation
        pl.axvline(p, linestyle=':')
    pl.plot(ticks, [n(i, True) for i in ticks], 'y-')  # Newton's derivative
    line = None

    def onclick(event):
        """
        Plots the tangent at the x position where the user clicked.
        """
        x = event.xdata
        slope = n(x, True)
        print 'Derivative at %f is %f.' % (x, slope)
        tangent = lambda t: slope * (t - x) + f(x)
        del (pl.gca().lines[-1])
        line = pl.plot(ticks, [tangent(i) for i in ticks], 'y--')
        fig.canvas.draw()

    cid = fig.canvas.mpl_connect('button_press_event', onclick)
    pl.show()


def ui():
    from numpy import abs, sqrt, sin, cos, tan, sinh, cosh, tanh, \
        arcsin, arccos, sign, max, min, e, exp, log, pi
    safe_list = ['np', 'abs', 'sqrt', 'sin', 'cos', 'tan', 'sinh', 'cosh', \
                 'tanh', 'arcsin', 'arccos', 'sign', 'max', 'min', 'e', 'exp', \
                 'log', 'pi']
    safe_dict = dict([(k, locals().get(k, None)) for k in safe_list])

    print
    """
    Newton interpolating numerical differentiation
    ----------------------------------------------
    Please enter the function expression in x. Available functions:
    """
    print
    safe_list
    print
    '(eg. x ** 3 + exp(x) + pi)'
    fun = raw_input('> ')
    f = lambda x: eval(fun, {"__builtins__": None}, dict(safe_dict.items() + [('x', x)]))
    a = float(raw_input('Starting point: '))
    b = float(raw_input('End point: '))
    n = int(raw_input('Number of points: '))
    r = raw_input('Random seed (press enter for equidistant points): ')
    if r == '':
        r = False
    else:
        r = int(r)

    differentiate(f, (a, b), n, r)


if __name__ == '__main__':
    again = True
    while (again):
        ui()
        again = raw_input('Again? ').lower().startswith('y')
