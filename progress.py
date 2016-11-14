#!/usr/bin/env python

from time import sleep 
import sys

blockchar = u'\u2588'
num = 100

print 'Loading: [%s] %d%%' % (' '*(num/2), 0),

try:
    colorCode = 42
    for x in xrange(num+1):
        if x == num: colorCode = 42
        print '\rLoading: [\033[1;%dm%s\033[1;m%s] %d%%' % (colorCode, blockchar*(x/2), " "*(num/2-x/2), x), 
        sys.stdout.flush()
        sleep(0.02) # do actual stuff here instead 
except KeyboardInterrupt:
        print '\rLoading: [\033[1;42m%s\033[1;m%s] %d%%  ' % (blockchar*(x/2), " "*(num/2-x/2), x)
