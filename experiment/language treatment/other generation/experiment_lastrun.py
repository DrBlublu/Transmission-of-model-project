#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.2.3),
    on November 16, 2023, at 17:41
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

import psychopy
psychopy.useVersion('2023.2.3')


# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
prefs.hardware['audioLib'] = 'ptb'
prefs.hardware['audioLatencyMode'] = '3'
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.tools import environmenttools
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER, priority)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from pl2_setup_code


# --- Setup global variables (available in all functions) ---
# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
# Store info about the experiment session
psychopyVersion = '2023.2.3'
expName = 'experiment'  # from the Builder filename that created this script
expInfo = {
    'participant': f"{randint(0, 999999):06.0f}",
    'session': '001',
    'date': data.getDateStr(),  # add a simple timestamp
    'expName': expName,
    'psychopyVersion': psychopyVersion,
}


def showExpInfoDlg(expInfo):
    """
    Show participant info dialog.
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    
    Returns
    ==========
    dict
        Information about this experiment.
    """
    # temporarily remove keys which the dialog doesn't need to show
    poppedKeys = {
        'date': expInfo.pop('date', data.getDateStr()),
        'expName': expInfo.pop('expName', expName),
        'psychopyVersion': expInfo.pop('psychopyVersion', psychopyVersion),
    }
    # show participant info dialog
    dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
    if dlg.OK == False:
        core.quit()  # user pressed cancel
    # restore hidden keys
    expInfo.update(poppedKeys)
    # return expInfo
    return expInfo


def setupData(expInfo, dataDir=None):
    """
    Make an ExperimentHandler to handle trials and saving.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    dataDir : Path, str or None
        Folder to save the data to, leave as None to create a folder in the current directory.    
    Returns
    ==========
    psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    
    # data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
    if dataDir is None:
        dataDir = _thisDir
    filename = u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])
    # make sure filename is relative to dataDir
    if os.path.isabs(filename):
        dataDir = os.path.commonprefix([dataDir, filename])
        filename = os.path.relpath(filename, dataDir)
    
    # an ExperimentHandler isn't essential but helps with data saving
    thisExp = data.ExperimentHandler(
        name=expName, version='',
        extraInfo=expInfo, runtimeInfo=None,
        originPath='C:\\Users\\aleblu\\Dropbox\\root\\work\\projects\\2023_transmission_of_model\\experiment\\clean\\experiment_lastrun.py',
        savePickle=True, saveWideText=True,
        dataFileName=dataDir + os.sep + filename, sortColumns='time'
    )
    thisExp.setPriority('', )
    # return experiment handler
    return thisExp


def setupLogging(filename):
    """
    Setup a log file and tell it what level to log at.
    
    Parameters
    ==========
    filename : str or pathlib.Path
        Filename to save log file and data files as, doesn't need an extension.
    
    Returns
    ==========
    psychopy.logging.LogFile
        Text stream to receive inputs from the logging system.
    """
    # this outputs to the screen, not a file
    logging.console.setLevel(logging.DATA)
    # save a log file for detail verbose info
    logFile = logging.LogFile(filename+'.log', level=logging.DATA)
    
    return logFile


def setupWindow(expInfo=None, win=None):
    """
    Setup the Window
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    win : psychopy.visual.Window
        Window to setup - leave as None to create a new window.
    
    Returns
    ==========
    psychopy.visual.Window
        Window in which to run this experiment.
    """
    if win is None:
        # if not given a window to setup, make one
        win = visual.Window(
            size=[1280, 720], fullscr=True, screen=0,
            winType='pyglet', allowStencil=True,
            monitor='testMonitor', color=[1,1,1], colorSpace='rgb',
            backgroundImage='', backgroundFit='none',
            blendMode='avg', useFBO=True,
            units='height'
        )
        if expInfo is not None:
            # store frame rate of monitor if we can measure it
            expInfo['frameRate'] = win.getActualFrameRate()
    else:
        # if we have a window, just set the attributes which are safe to set
        win.color = [1,1,1]
        win.colorSpace = 'rgb'
        win.backgroundImage = ''
        win.backgroundFit = 'none'
        win.units = 'height'
    win.mouseVisible = False
    win.hideMessage()
    return win


def setupInputs(expInfo, thisExp, win):
    """
    Setup whatever inputs are available (mouse, keyboard, eyetracker, etc.)
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    win : psychopy.visual.Window
        Window in which to run this experiment.
    Returns
    ==========
    dict
        Dictionary of input devices by name.
    """
    # --- Setup input devices ---
    inputs = {}
    ioConfig = {}
    
    # Setup iohub keyboard
    ioConfig['Keyboard'] = dict(use_keymap='psychopy')
    
    ioSession = '1'
    if 'session' in expInfo:
        ioSession = str(expInfo['session'])
    ioServer = io.launchHubServer(window=win, **ioConfig)
    eyetracker = None
    
    # create a default keyboard (e.g. to check for escape)
    defaultKeyboard = keyboard.Keyboard(backend='iohub')
    # return inputs dict
    return {
        'ioServer': ioServer,
        'defaultKeyboard': defaultKeyboard,
        'eyetracker': eyetracker,
    }

def pauseExperiment(thisExp, inputs=None, win=None, timers=[], playbackComponents=[]):
    """
    Pause this experiment, preventing the flow from advancing to the next routine until resumed.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    inputs : dict
        Dictionary of input devices by name.
    win : psychopy.visual.Window
        Window for this experiment.
    timers : list, tuple
        List of timers to reset once pausing is finished.
    playbackComponents : list, tuple
        List of any components with a `pause` method which need to be paused.
    """
    # if we are not paused, do nothing
    if thisExp.status != PAUSED:
        return
    
    # pause any playback components
    for comp in playbackComponents:
        comp.pause()
    # prevent components from auto-drawing
    win.stashAutoDraw()
    # run a while loop while we wait to unpause
    while thisExp.status == PAUSED:
        # make sure we have a keyboard
        if inputs is None:
            inputs = {
                'defaultKeyboard': keyboard.Keyboard(backend='ioHub')
            }
        # check for quit (typically the Esc key)
        if inputs['defaultKeyboard'].getKeys(keyList=['escape']):
            endExperiment(thisExp, win=win, inputs=inputs)
        # flip the screen
        win.flip()
    # if stop was requested while paused, quit
    if thisExp.status == FINISHED:
        endExperiment(thisExp, inputs=inputs, win=win)
    # resume any playback components
    for comp in playbackComponents:
        comp.play()
    # restore auto-drawn components
    win.retrieveAutoDraw()
    # reset any timers
    for timer in timers:
        timer.reset()


def run(expInfo, thisExp, win, inputs, globalClock=None, thisSession=None):
    """
    Run the experiment flow.
    
    Parameters
    ==========
    expInfo : dict
        Information about this experiment, created by the `setupExpInfo` function.
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    psychopy.visual.Window
        Window in which to run this experiment.
    inputs : dict
        Dictionary of input devices by name.
    globalClock : psychopy.core.clock.Clock or None
        Clock to get global time from - supply None to make a new one.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    # mark experiment as started
    thisExp.status = STARTED
    # make sure variables created by exec are available globally
    exec = environmenttools.setExecEnvironment(globals())
    # get device handles from dict of input devices
    ioServer = inputs['ioServer']
    defaultKeyboard = inputs['defaultKeyboard']
    eyetracker = inputs['eyetracker']
    # make sure we're running in the directory for this experiment
    os.chdir(_thisDir)
    # get filename from ExperimentHandler for convenience
    filename = thisExp.dataFileName
    frameTolerance = 0.001  # how close to onset before 'same' frame
    endExpNow = False  # flag for 'escape' or other condition => quit the exp
    # get frame duration from frame rate in expInfo
    if 'frameRate' in expInfo and expInfo['frameRate'] is not None:
        frameDur = 1.0 / round(expInfo['frameRate'])
    else:
        frameDur = 1.0 / 60.0  # could not measure, so guess
    
    # Start Code - component code to be run after the window creation
    
    # --- Initialize components for Routine "global_setup" ---
    # Run 'Begin Experiment' code from global_setup_code
    import random, math
    import numpy as np
    
    #################################
    ############GOLOBAL##############
    #################################
    
    global_step1_stim_size = (12/34, .5)
    global_step1_stimLeft_pos = (-.5, .09)
    global_step1_stimRight_pos = (.5, .09)
    global_highlight_size = (.6, .75)
    global_step2_stim_size = (.4, .4)
    global_step2_pos = (0, -.1)
    global_score = 0
    global_score_pos = (.7, .4)
    global_score_size = 0.05
    global_scoreBg_size = (.30, .1)
    global_scoreBg_pos = (.70, .45)
    global_gaussian_dist = list(np.random.normal(0, 2, 1000))
    
    pl_task_stimUp_pos = (0, 0)
    pl_step2Bg_size = (.3, .3)
    pl_basket_size = (.2, .2)
    pl_step2LeftBg_pos = (-.5, -.1)
    pl_step2RightBg_pos = (.5, -.1)
    pl_task_stimLeft_pos = (-.5, -.2)
    pl_task_stimRight_pos = (.5, -.2)
    
    pl2_task_stimLeft_pos = (-.5, -.4)
    pl2_task_stimRight_pos = (.5, -.4)
    
    #################################
    ############PRACTICE#############
    #################################
    
    p_index = 0
    p_score = 0
    
    p_basket_names = [["p_green_basket", "ressources/p_step2_stim1.jpg"], ["p_blue_basket", "ressources/p_step2_stim2.jpg"]]
    random.shuffle(p_basket_names)
    
    rmin = 0
    rmax = 9
    rmean = (rmax + rmin)/2
    
    high_reward = [5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
    low_reward = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4]
    
    l_reward = [high_reward, low_reward]
    random.shuffle(l_reward)
    
    p_step2_stim1 = {"name": "p_yellow_forest", "file": "ressources/p_step2_background1.jpg", "basket_name": p_basket_names[0][0], "basket_file": p_basket_names[0][1], "reward": l_reward[0]}
    p_step2_stim2 = {"name": "p_green_forest", "file": "ressources/p_step2_background2.jpg", "basket_name": p_basket_names[1][0], "basket_file": p_basket_names[1][1], "reward": l_reward[1]}
    
    p_step1_stim1 = {"name": "p_pink_gnomes", "file": "ressources/p_step1_stim1.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/p_step1_stim1_deact.jpg"}
    p_step1_stim2 = {"name": "p_blue_gnome", "file": "ressources/p_step1_stim2.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/p_step1_stim2_deact.jpg"}
    p_step1_stim3 = {"name": "p_green_gnome", "file": "ressources/p_step1_stim3.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/p_step1_stim3_deact.jpg"}
    p_step1_stim4 = {"name": "p_orange_gnome", "file": "ressources/p_step1_stim4.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/p_step1_stim4_deact.jpg"}
    
    l_p_step1_stims = [p_step1_stim1, p_step1_stim2, p_step1_stim3, p_step1_stim4]
    l_p_step2_stims = [p_step2_stim1, p_step2_stim2]
    
    pair_num = [1, 1, 2, 2]
    
    random.shuffle(l_p_step1_stims)
    
    i = 0
    for p_step1_stim in l_p_step1_stims:
        p_step1_stim["pair"] = pair_num[i]
        if i == 0 or i == 2:
            p_step1_stim["step2"] = l_p_step2_stims[0]
        else:
            p_step1_stim["step2"] = l_p_step2_stims[1]
        p_step1_stim["reward"] = p_step1_stim["step2"]["reward"]    
        i += 1
    
    #################################
    #############TRIALS##############
    #################################
    
    basket_names = [["yellow_basket", "ressources/step2_stim1.jpg"], ["red_basket", "ressources/step2_stim2.jpg"]]
    random.shuffle(basket_names)
    
    rmin = 0
    rmax = 9
    rmean = (rmax + rmin)/2
    
    high_reward = random.randint(math.ceil(rmean), rmax)
    low_reward = random.randint(rmin, math.floor(rmean))
    
    l_reward = [high_reward, low_reward]
    random.shuffle(l_reward)
    
    t_step2_stim1 = {"name": "bright_forest", "file": "ressources/step2_background1.jpg", "basket_name": basket_names[0][0], "basket_file": basket_names[0][1], "reward": l_reward[0]}
    t_step2_stim2 = {"name": "dark_forest", "file": "ressources/step2_background2.jpg", "basket_name": basket_names[1][0], "basket_file": basket_names[1][1], "reward": l_reward[1]}
    
    t_step1_stim1 = {"name": "green_gnomes", "file": "ressources/step1_stim1.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/step1_stim1_deact.jpg"}
    t_step1_stim2 = {"name": "red_gnome", "file": "ressources/step1_stim2.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/step1_stim2_deact.jpg"}
    t_step1_stim3 = {"name": "brown_gnome", "file": "ressources/step1_stim3.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/step1_stim3_deact.jpg"}
    t_step1_stim4 = {"name": "purple_gnome", "file": "ressources/step1_stim4.jpg", "reward": None, "step2": None, "pair": None, "deact_file": "ressources/step1_stim4_deact.jpg"}
    
    l_t_step1_stims = [t_step1_stim1, t_step1_stim2, t_step1_stim3, t_step1_stim4]
    l_t_step2_stims = [t_step2_stim1, t_step2_stim2]
    
    pair_num = [1, 1, 2, 2]
    
    random.shuffle(l_t_step1_stims)
    
    i = 0
    for t_step1_stim in l_t_step1_stims:
        t_step1_stim["pair"] = pair_num[i]
        if i == 0 or i == 2:
            t_step1_stim["step2"] = l_t_step2_stims[0]
        else:
            t_step1_stim["step2"] = l_t_step2_stims[1]
        t_step1_stim["reward"] = t_step1_stim["step2"]["reward"""]    
        i += 1
    
    #################################
    ##############DATA###############
    #################################
    
    p_points = None
    p_step1_choice = {"name": None, "file": None, "basket_name": None, "basket_file": None, "reward": None}
    p_step2_stim_var = {"name": None, "file": None, "basket_name": None, "basket_file": None, "reward": None}
    t_points = None
    t_step1_choice = {"name": None, "file": None, "basket_name": None, "basket_file": None, "reward": None}
    t_step2_stim_var = {"name": None, "file": None, "basket_name": None, "basket_file": None, "reward": None}
    
    #################################
    ############STARTING#############
    #################################
    
    p_step1_stimLeft_file = "ressources/mush0.jpg"
    p_step1_stimRight_file = "ressources/mush0.jpg"
    p_step2_stimBg_file = "ressources/mush0.jpg"
    p_step2_stimBasket_file = "ressources/mush0.jpg"
    
    #################################
    ###############PL1###############
    #################################
    
    pl1_index = 0
    pl1_task_index = [0, 1]
    random.shuffle(pl1_task_index)
    pl1_task_step2LeftStim_var = l_t_step2_stims[pl1_task_index[0]]
    pl1_task_step2RightStim_var = l_t_step2_stims[pl1_task_index[1]]
    
    #################################
    ######NEXT PARTICIANT DATA#######
    #################################
    
    stim_num = 1
    for i in l_t_step1_stims:
        thisExp.addData("stim" + str(stim_num) + "_name", i["name"])
        thisExp.addData("stim" + str(stim_num) + "_file", i["file"])
        thisExp.addData("stim" + str(stim_num) + "_pair", i["pair"])
        thisExp.addData("stim" + str(stim_num) + "_deact_file", i["deact_file"])
        thisExp.addData("stim" + str(stim_num) + "_step2_name", i["step2"]["name"])
        thisExp.addData("stim" + str(stim_num) + "_step2_file", i["step2"]["file"])
        thisExp.addData("stim" + str(stim_num) + "_step2_basket_name", i["step2"]["basket_name"])
        thisExp.addData("stim" + str(stim_num) + "_step2_basket_file", i["step2"]["basket_file"])
        stim_num += 1
        
    
    
    # --- Initialize components for Routine "global_instructions" ---
    global_instructions_keyresp = keyboard.Keyboard()
    global_instructions_txt = visual.TextStim(win=win, name='global_instructions_txt',
        text='GLOBAL INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    
    # --- Initialize components for Routine "p_instructions" ---
    p_instructions_txt = visual.TextStim(win=win, name='p_instructions_txt',
        text='Any text\n\nincluding line breaks',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    p_instructrions_keyresp = keyboard.Keyboard()
    
    # --- Initialize components for Routine "p_setup" ---
    
    # --- Initialize components for Routine "p_step1" ---
    p_step1_keyresp = keyboard.Keyboard()
    
    # --- Initialize components for Routine "p_step2" ---
    p_step2_keyresp = keyboard.Keyboard()
    
    # --- Initialize components for Routine "p_reward" ---
    p_reward_bg_img = visual.ImageStim(
        win=win,
        name='p_reward_bg_img', units='norm', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    p_reward_step2Stim_img = visual.ImageStim(
        win=win,
        name='p_reward_step2Stim_img', units='height', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step2_pos, size=global_step2_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    p_reward_step2Highlight_img = visual.ImageStim(
        win=win,
        name='p_reward_step2Highlight_img', 
        image='ressources/highlight.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=[0,0], size=(.60, .60),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    p_reward_scoreBg_img = visual.ImageStim(
        win=win,
        name='p_reward_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    p_reward_rewardAmount_txt = visual.TextStim(win=win, name='p_reward_rewardAmount_txt',
        text='',
        font='Open Sans',
        pos=(0, 0.35), height=0.25, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-4.0);
    p_reward_score_txt = visual.TextStim(win=win, name='p_reward_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-6.0);
    p_reward_mushroom_img = visual.ImageStim(
        win=win,
        name='p_reward_mushroom_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=(0, .2), size=(.5, .5),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-7.0)
    
    # --- Initialize components for Routine "p_failStep1" ---
    p_failStep1_bg_img = visual.ImageStim(
        win=win,
        name='p_failStep1_bg_img', units='norm', 
        image='ressources/step1_background.jpg', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    p_failStep1_leftStim_img = visual.ImageStim(
        win=win,
        name='p_failStep1_leftStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step1_stimLeft_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    p_failStep1_rightStim_img = visual.ImageStim(
        win=win,
        name='p_failStep1_rightStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step1_stimRight_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    p_failStep1_scoreBg_img = visual.ImageStim(
        win=win,
        name='p_failStep1_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    p_fail_score_txt = visual.TextStim(win=win, name='p_fail_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-4.0);
    
    # --- Initialize components for Routine "p_failStep2" ---
    p_failStep2_bg_img = visual.ImageStim(
        win=win,
        name='p_failStep2_bg_img', units='norm', 
        image=None, mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    p_failStep2_stim_img = visual.ImageStim(
        win=win,
        name='p_failStep2_stim_img', units='height', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step2_pos, size=global_step2_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    p_failStep2_scoreBg_img = visual.ImageStim(
        win=win,
        name='p_failStep2_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    p_failStep2_score_txt = visual.TextStim(win=win, name='p_failStep2_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-3.0);
    
    # --- Initialize components for Routine "p_data" ---
    
    # --- Initialize components for Routine "t_instructions" ---
    t_instructions_text = visual.TextStim(win=win, name='t_instructions_text',
        text='TRIAL INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    t_instructions_keyresp = keyboard.Keyboard()
    
    # --- Initialize components for Routine "t_setup" ---
    
    # --- Initialize components for Routine "t_step1" ---
    t_step1_bg_img = visual.ImageStim(
        win=win,
        name='t_step1_bg_img', units='norm', 
        image='ressources/step1_background.jpg', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    t_step1_keyresp = keyboard.Keyboard()
    t_step1_leftStim_img = visual.ImageStim(
        win=win,
        name='t_step1_leftStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step1_stimLeft_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    t_step1_rightStim_img = visual.ImageStim(
        win=win,
        name='t_step1_rightStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step1_stimRight_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    t_step1_highlight_img = visual.ImageStim(
        win=win,
        name='t_step1_highlight_img', units='height', 
        image='ressources/highlight.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=[0,0], size=global_highlight_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    t_step1_scoreBg_img = visual.ImageStim(
        win=win,
        name='t_step1_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-6.0)
    t_step1_score_txt = visual.TextStim(win=win, name='t_step1_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-7.0);
    t_step1_unchosenDeact_img = visual.ImageStim(
        win=win,
        name='t_step1_unchosenDeact_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=[0,0], size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-8.0)
    
    # --- Initialize components for Routine "t_step2" ---
    t_step2_bg_img = visual.ImageStim(
        win=win,
        name='t_step2_bg_img', units='norm', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    t_step2_keyresp = keyboard.Keyboard()
    t_step2_stim_img = visual.ImageStim(
        win=win,
        name='t_step2_stim_img', units='height', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step2_pos, size=global_step2_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    t_step2_highlight_img = visual.ImageStim(
        win=win,
        name='t_step2_highlight_img', 
        image='ressources/highlight.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=[0,0], size=(.60, .60),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    t_step2_scoreBg_img = visual.ImageStim(
        win=win,
        name='t_step2_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    t_step2_score_txt = visual.TextStim(win=win, name='t_step2_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-6.0);
    
    # --- Initialize components for Routine "t_reward" ---
    t_reward_bg_img = visual.ImageStim(
        win=win,
        name='t_reward_bg_img', units='norm', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    t_reward_step2Stim_img = visual.ImageStim(
        win=win,
        name='t_reward_step2Stim_img', units='height', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step2_pos, size=global_step2_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    t_reward_step2Highlight_img = visual.ImageStim(
        win=win,
        name='t_reward_step2Highlight_img', 
        image='ressources/highlight.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=[0,0], size=(.60, .60),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    t_reward_scoreBg_img = visual.ImageStim(
        win=win,
        name='t_reward_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    t_reward_rewardAmount_txt = visual.TextStim(win=win, name='t_reward_rewardAmount_txt',
        text='',
        font='Open Sans',
        pos=(0, 0.35), height=0.25, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-4.0);
    t_reward_score_txt = visual.TextStim(win=win, name='t_reward_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-6.0);
    t_reward_mushroom_img = visual.ImageStim(
        win=win,
        name='t_reward_mushroom_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=(0, .2), size=(.5, .5),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-7.0)
    
    # --- Initialize components for Routine "t_failStep1" ---
    t_failStep1_bg_img = visual.ImageStim(
        win=win,
        name='t_failStep1_bg_img', units='norm', 
        image='ressources/step1_background.jpg', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    t_failStep1_leftStim_img = visual.ImageStim(
        win=win,
        name='t_failStep1_leftStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step1_stimLeft_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    t_failStep1_rightStim_img = visual.ImageStim(
        win=win,
        name='t_failStep1_rightStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step1_stimRight_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    t_failStep1_scoreBg_img = visual.ImageStim(
        win=win,
        name='t_failStep1_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    t_fail_score_txt = visual.TextStim(win=win, name='t_fail_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-4.0);
    
    # --- Initialize components for Routine "t_failStep2" ---
    t_failStep2_bg_img = visual.ImageStim(
        win=win,
        name='t_failStep2_bg_img', units='norm', 
        image='default.png', mask=None, anchor='center',
        ori=0.0, pos=(0, 0), size=(2, 2),
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    t_failStep2_stim_img = visual.ImageStim(
        win=win,
        name='t_failStep2_stim_img', units='height', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=global_step2_pos, size=global_step2_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-1.0)
    t_failStep2_scoreBg_img = visual.ImageStim(
        win=win,
        name='t_failStep2_scoreBg_img', 
        image='ressources/grey_rectangle.jpg', mask=None, anchor='top-center',
        ori=0.0, pos=global_scoreBg_pos, size=global_scoreBg_size,
        color=[0, 0, 0], colorSpace='rgb', opacity=0.9,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    t_failStep2_score_txt = visual.TextStim(win=win, name='t_failStep2_score_txt',
        text='',
        font='Open Sans',
        pos=global_score_pos, height=global_score_size, wrapWidth=None, ori=0.0, 
        color='white', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-3.0);
    
    # --- Initialize components for Routine "t_data" ---
    
    # --- Initialize components for Routine "verbal_transmission" ---
    vb_textbox = visual.TextBox2(
         win, text=None, placeholder='Type here...', font='Arial',
         pos=[-0.85, 0.45],     letterHeight=0.03,
         size=[1.30, .90], borderWidth=4.0,
         color=[-1.0000, -1.0000, -1.0000], colorSpace='rgb',
         opacity=None,
         bold=False, italic=False,
         lineSpacing=1.0, speechPoint=None,
         padding=0.05, alignment='top-left',
         anchor='top-left', overflow='hidden',
         fillColor=[0.8500, 0.8500, 0.8500], borderColor=[-0.4000, -0.4000, -0.4000],
         flipHoriz=False, flipVert=False, languageStyle='LTR',
         editable=True,
         name='vb_textbox',
         depth=0, autoLog=False,
    )
    vb_finished_typing = visual.ButtonStim(win, 
        text='Click here when you are done typing', font='Arial',
        pos=[.50, -.25],
        letterHeight=0.03,
        size=(.35, .15), borderWidth=1.5,
        fillColor=[0.7000, 0.7000, 0.7000], borderColor='black',
        color='black', colorSpace='rgb',
        opacity=None,
        bold=True, italic=False,
        padding=None,
        anchor='top-left',
        name='vb_finished_typing',
        depth=-1
    )
    vb_finished_typing.buttonClock = core.Clock()
    vb_text = visual.TextStim(win=win, name='vb_text',
        text='',
        font='Arial',
        pos=(.67, .38), height=0.04, wrapWidth=None, ori=0.0, 
        color=[-1.0000, -1.0000, -1.0000], colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-2.0);
    
    # --- Initialize components for Routine "pl_instructions" ---
    pl_instructions_keyresp = keyboard.Keyboard()
    pl_instructions_txt = visual.TextStim(win=win, name='pl_instructions_txt',
        text='PL INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    
    # --- Initialize components for Routine "pl1_instructions" ---
    pl1_instructions_keyresp = keyboard.Keyboard()
    pl1_instructions_txt = visual.TextStim(win=win, name='pl1_instructions_txt',
        text='PL1 INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    
    # --- Initialize components for Routine "pl1_setup" ---
    
    # --- Initialize components for Routine "pl1_task" ---
    pl1_task_stim_img = visual.ImageStim(
        win=win,
        name='pl1_task_stim_img', 
        image='default.png', mask=None, anchor='bottom-center',
        ori=0.0, pos=pl_task_stimUp_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    pl1_task_lickert = visual.Slider(win=win, name='pl1_task_lickert',
        startValue=50, size=(1., .05), pos=(0, -.44), units=win.units,
        labels=None, ticks=(1, 100), granularity=0.0,
        style='rating', styleTweaks=(), opacity=None,
        labelColor='LightGray', markerColor='Red', lineColor='Black', colorSpace='rgb',
        font='Open Sans', labelHeight=0.05,
        flip=False, ori=0.0, depth=-1, readOnly=False)
    pl1_task_step2LeftStimBg_img = visual.ImageStim(
        win=win,
        name='pl1_task_step2LeftStimBg_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_step2LeftBg_pos, size=pl_step2Bg_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    pl1_task_step2RightStimBg_img = visual.ImageStim(
        win=win,
        name='pl1_task_step2RightStimBg_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_step2RightBg_pos, size=pl_step2Bg_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    pl1_task_step2LeftStim_img = visual.ImageStim(
        win=win,
        name='pl1_task_step2LeftStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_task_stimLeft_pos, size=pl_basket_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    pl1_task_step2RightStim_img = visual.ImageStim(
        win=win,
        name='pl1_task_step2RightStim_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_task_stimRight_pos, size=pl_basket_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    pl1_task_keyresp = keyboard.Keyboard()
    pl1_task_fixation_txt = visual.TextStim(win=win, name='pl1_task_fixation_txt',
        text='+',
        font='Open Sans',
        pos=(0, 0), height=0.3, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-7.0);
    
    # --- Initialize components for Routine "pl1_data" ---
    
    # --- Initialize components for Routine "pl2_instructions" ---
    pl2_instructions_keyresp = keyboard.Keyboard()
    pl2_instructions_txt = visual.TextStim(win=win, name='pl2_instructions_txt',
        text='PL2 INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    
    # --- Initialize components for Routine "pl2_setup" ---
    
    # --- Initialize components for Routine "pl2_task" ---
    pl2_task_stimUp_img = visual.ImageStim(
        win=win,
        name='pl2_task_stimUp_img', 
        image='default.png', mask=None, anchor='bottom-center',
        ori=0.0, pos=pl_task_stimUp_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=0.0)
    pl2_task_lickert = visual.Slider(win=win, name='pl2_task_lickert',
        startValue=50, size=(1., .05), pos=(0, -.44), units=win.units,
        labels=None, ticks=(1, 100), granularity=0.0,
        style='rating', styleTweaks=(), opacity=None,
        labelColor='LightGray', markerColor='Red', lineColor='Black', colorSpace='rgb',
        font='Open Sans', labelHeight=0.05,
        flip=False, ori=0.0, depth=-1, readOnly=False)
    pl2_task_stimLeft_img = visual.ImageStim(
        win=win,
        name='pl2_task_stimLeft_img', 
        image='default.png', mask=None, anchor='bottom-center',
        ori=0.0, pos=pl2_task_stimLeft_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-2.0)
    pl2_task_stimRight_img = visual.ImageStim(
        win=win,
        name='pl2_task_stimRight_img', 
        image='default.png', mask=None, anchor='bottom-center',
        ori=0.0, pos=pl2_task_stimRight_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-3.0)
    pl2_task_keyresp = keyboard.Keyboard()
    pl2_task_fixation_txt = visual.TextStim(win=win, name='pl2_task_fixation_txt',
        text='+',
        font='Open Sans',
        pos=(0, 0), height=0.3, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-5.0);
    
    # --- Initialize components for Routine "pl2_data" ---
    
    # --- Initialize components for Routine "pl3_instructions" ---
    pl3_instructions_keyresp = keyboard.Keyboard()
    pl3_instructions_txt = visual.TextStim(win=win, name='pl3_instructions_txt',
        text='PL3 INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    
    # --- Initialize components for Routine "pl3_setup" ---
    
    # --- Initialize components for Routine "pl3_task" ---
    pl3_task_stimUp_txt = visual.TextStim(win=win, name='pl3_task_stimUp_txt',
        text='HIGHEST REWARD ?',
        font='Arial',
        pos=(0, .35), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    pl3_task_lickert = visual.Slider(win=win, name='pl3_task_lickert',
        startValue=50, size=(1., .05), pos=(0, -.44), units=win.units,
        labels=None, ticks=(1, 100), granularity=0.0,
        style='rating', styleTweaks=(), opacity=None,
        labelColor='LightGray', markerColor='Red', lineColor='Black', colorSpace='rgb',
        font='Open Sans', labelHeight=0.05,
        flip=False, ori=0.0, depth=-1, readOnly=False)
    pl3_task_fixation_txt = visual.TextStim(win=win, name='pl3_task_fixation_txt',
        text='+',
        font='Open Sans',
        pos=(0, 0), height=0.3, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-2.0);
    pl3_task_keyresp = keyboard.Keyboard()
    pl3_task_stimLeftBg_img = visual.ImageStim(
        win=win,
        name='pl3_task_stimLeftBg_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_step2LeftBg_pos, size=pl_step2Bg_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    pl3_task_stimRightBg_img = visual.ImageStim(
        win=win,
        name='pl3_task_stimRightBg_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_step2RightBg_pos, size=pl_step2Bg_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    pl3_task_stimLeft_img = visual.ImageStim(
        win=win,
        name='pl3_task_stimLeft_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_task_stimLeft_pos, size=pl_basket_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-6.0)
    pl3_task_stimRight_img = visual.ImageStim(
        win=win,
        name='pl3_task_stimRight_img', 
        image='default.png', mask=None, anchor='top-center',
        ori=0.0, pos=pl_task_stimRight_pos, size=pl_basket_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-7.0)
    
    # --- Initialize components for Routine "pl3_data" ---
    
    # --- Initialize components for Routine "pl4_instructions" ---
    pl4_instructions_keyresp = keyboard.Keyboard()
    pl4_instructions_txt = visual.TextStim(win=win, name='pl4_instructions_txt',
        text='PL4 INSTRUCTIONS',
        font='Open Sans',
        pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    
    # --- Initialize components for Routine "pl4_setup" ---
    
    # --- Initialize components for Routine "pl4_task" ---
    pl4_task_stimUp_txt = visual.TextStim(win=win, name='pl4_task_stimUp_txt',
        text='HIGHEST REWARD ?',
        font='Arial',
        pos=(0, .35), height=0.05, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=0.0);
    pl4_task_fixation_txt = visual.TextStim(win=win, name='pl4_task_fixation_txt',
        text='+',
        font='Open Sans',
        pos=(0, 0), height=0.3, wrapWidth=None, ori=0.0, 
        color='black', colorSpace='rgb', opacity=None, 
        languageStyle='LTR',
        depth=-1.0);
    pl4_task_lickert = visual.Slider(win=win, name='pl4_task_lickert',
        startValue=50, size=(1., .05), pos=(0, -.44), units=win.units,
        labels=None, ticks=(1, 100), granularity=0.0,
        style='rating', styleTweaks=(), opacity=None,
        labelColor='LightGray', markerColor='Red', lineColor='Black', colorSpace='rgb',
        font='Open Sans', labelHeight=0.05,
        flip=False, ori=0.0, depth=-2, readOnly=False)
    pl4_task_keyresp = keyboard.Keyboard()
    pl4_task_stimLeft_img = visual.ImageStim(
        win=win,
        name='pl4_task_stimLeft_img', 
        image='default.png', mask=None, anchor='bottom-center',
        ori=0.0, pos=pl2_task_stimLeft_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-4.0)
    pl4_task_stimRight_img = visual.ImageStim(
        win=win,
        name='pl4_task_stimRight_img', 
        image='default.png', mask=None, anchor='bottom-center',
        ori=0.0, pos=pl2_task_stimRight_pos, size=global_step1_stim_size,
        color=[1,1,1], colorSpace='rgb', opacity=None,
        flipHoriz=False, flipVert=False,
        texRes=128.0, interpolate=True, depth=-5.0)
    
    # --- Initialize components for Routine "pl4_data" ---
    
    # create some handy timers
    if globalClock is None:
        globalClock = core.Clock()  # to track the time since experiment started
    if ioServer is not None:
        ioServer.syncClock(globalClock)
    logging.setDefaultClock(globalClock)
    routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine
    win.flip()  # flip window to reset last flip timer
    # store the exact time the global clock started
    expInfo['expStart'] = data.getDateStr(format='%Y-%m-%d %Hh%M.%S.%f %z', fractionalSecondDigits=6)
    
    # --- Prepare to start Routine "global_setup" ---
    continueRoutine = True
    # update component parameters for each repeat
    # keep track of which components have finished
    global_setupComponents = []
    for thisComponent in global_setupComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "global_setup" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in global_setupComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "global_setup" ---
    for thisComponent in global_setupComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # the Routine "global_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "global_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    global_instructions_keyresp.keys = []
    global_instructions_keyresp.rt = []
    _global_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    global_instructionsComponents = [global_instructions_keyresp, global_instructions_txt]
    for thisComponent in global_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "global_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *global_instructions_keyresp* updates
        
        # if global_instructions_keyresp is starting this frame...
        if global_instructions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            global_instructions_keyresp.frameNStart = frameN  # exact frame index
            global_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            global_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(global_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            global_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            global_instructions_keyresp.clock.reset()  # now t=0
            global_instructions_keyresp.clearEvents(eventType='keyboard')
        if global_instructions_keyresp.status == STARTED:
            theseKeys = global_instructions_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _global_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_global_instructions_keyresp_allKeys):
                global_instructions_keyresp.keys = _global_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                global_instructions_keyresp.rt = _global_instructions_keyresp_allKeys[-1].rt
                global_instructions_keyresp.duration = _global_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *global_instructions_txt* updates
        
        # if global_instructions_txt is starting this frame...
        if global_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            global_instructions_txt.frameNStart = frameN  # exact frame index
            global_instructions_txt.tStart = t  # local t and not account for scr refresh
            global_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(global_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            global_instructions_txt.status = STARTED
            global_instructions_txt.setAutoDraw(True)
        
        # if global_instructions_txt is active this frame...
        if global_instructions_txt.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in global_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "global_instructions" ---
    for thisComponent in global_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if global_instructions_keyresp.keys in ['', [], None]:  # No response was made
        global_instructions_keyresp.keys = None
    thisExp.addData('global_instructions_keyresp.keys',global_instructions_keyresp.keys)
    if global_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('global_instructions_keyresp.rt', global_instructions_keyresp.rt)
        thisExp.addData('global_instructions_keyresp.duration', global_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "global_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "p_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    p_instructrions_keyresp.keys = []
    p_instructrions_keyresp.rt = []
    _p_instructrions_keyresp_allKeys = []
    # keep track of which components have finished
    p_instructionsComponents = [p_instructions_txt, p_instructrions_keyresp]
    for thisComponent in p_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "p_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *p_instructions_txt* updates
        
        # if p_instructions_txt is starting this frame...
        if p_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            p_instructions_txt.frameNStart = frameN  # exact frame index
            p_instructions_txt.tStart = t  # local t and not account for scr refresh
            p_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(p_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            p_instructions_txt.status = STARTED
            p_instructions_txt.setAutoDraw(True)
        
        # if p_instructions_txt is active this frame...
        if p_instructions_txt.status == STARTED:
            # update params
            pass
        
        # *p_instructrions_keyresp* updates
        
        # if p_instructrions_keyresp is starting this frame...
        if p_instructrions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            p_instructrions_keyresp.frameNStart = frameN  # exact frame index
            p_instructrions_keyresp.tStart = t  # local t and not account for scr refresh
            p_instructrions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(p_instructrions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            p_instructrions_keyresp.status = STARTED
            # keyboard checking is just starting
            p_instructrions_keyresp.clock.reset()  # now t=0
            p_instructrions_keyresp.clearEvents(eventType='keyboard')
        if p_instructrions_keyresp.status == STARTED:
            theseKeys = p_instructrions_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _p_instructrions_keyresp_allKeys.extend(theseKeys)
            if len(_p_instructrions_keyresp_allKeys):
                p_instructrions_keyresp.keys = _p_instructrions_keyresp_allKeys[-1].name  # just the last key pressed
                p_instructrions_keyresp.rt = _p_instructrions_keyresp_allKeys[-1].rt
                p_instructrions_keyresp.duration = _p_instructrions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in p_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "p_instructions" ---
    for thisComponent in p_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if p_instructrions_keyresp.keys in ['', [], None]:  # No response was made
        p_instructrions_keyresp.keys = None
    thisExp.addData('p_instructrions_keyresp.keys',p_instructrions_keyresp.keys)
    if p_instructrions_keyresp.keys != None:  # we had a response
        thisExp.addData('p_instructrions_keyresp.rt', p_instructrions_keyresp.rt)
        thisExp.addData('p_instructrions_keyresp.duration', p_instructrions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "p_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    practice = data.TrialHandler(nReps=5.0, method='fullRandom', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('trials_pairIndex.csv'),
        seed=None, name='practice')
    thisExp.addLoop(practice)  # add the loop to the experiment
    thisPractice = practice.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisPractice.rgb)
    if thisPractice != None:
        for paramName in thisPractice:
            globals()[paramName] = thisPractice[paramName]
    
    for thisPractice in practice:
        currentLoop = practice
        thisExp.timestampOnFlip(win, 'thisRow.t')
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                inputs=inputs, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisPractice.rgb)
        if thisPractice != None:
            for paramName in thisPractice:
                globals()[paramName] = thisPractice[paramName]
        
        # --- Prepare to start Routine "p_setup" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from p_setup_code
        p_step2_flag = 0
        p_reward_flag = 0
        p_failStep1_flag = 0
        p_failStep2_flag = 0
        
        
        p_points = 0
        p_step1_pair = []
        
        
        for stim in l_p_step1_stims:
            if stim["pair"] == pair_index: #from csv file
                p_step1_pair.append(stim)
        random.shuffle(p_step1_pair)
        p_step1_stimLeft_var = p_step1_pair[0]
        p_step1_stimRight_var = p_step1_pair[1]
        
        p_step1_deact_img = "ressources/mush0.jpg"
        
        p_step1_stimRight_file = p_step1_stimRight_var["file"]
        p_step1_stimLeft_file = p_step1_stimLeft_var["file"]
        p_step1_stimRightDeact_file = p_step1_stimRight_var["deact_file"]
        p_step1_stimLeftDeact_file = p_step1_stimLeft_var["deact_file"]
        
        
        ##p_step1_init
        
        p_step1_bg_img = visual.ImageStim(
            win = win,
            name = 'p_step1_bg_img', units = 'norm', 
            image = 'ressources/step1_background.jpg', mask = None,
            anchor = 'center',
            ori = 0.0, pos = [0, 0], size = [2, 2],
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = 0.0 
        )
         
        p_step1_leftStim_img = visual.ImageStim(
            win = win,
            name = 'p_step1_leftStim_img', units = None, 
            image = p_step1_stimLeft_file, mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = global_step1_stimLeft_pos, size = global_step1_stim_size,
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -3.0 
        )
        
        p_step1_rightStim_img = visual.ImageStim(
            win = win,
            name = 'p_step1_rightStim_img', units = None, 
            image = p_step1_stimRight_file, mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = global_step1_stimRight_pos, size = global_step1_stim_size,
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -4.0 
        )
        
        p_step1_highlight_img = visual.ImageStim(
            win = win,
            name = 'p_step1_highlight_img', units = 'height', 
            image = 'ressources/highlight.jpg', mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = None, size = global_highlight_size,
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -5.0 
        )
        
        p_step1_scoreBg_img = visual.ImageStim(
            win = win,
            name = 'p_step1_scoreBg_img', units = None, 
            image = 'ressources/grey_rectangle.jpg', mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = global_scoreBg_pos, size = global_scoreBg_size,
            color = [0, 0, 0], opacity = 0.9,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -6.0 
        )
        
        p_step1_score_txt = visual.TextStim(
            win = win,
            name = 'p_step1_score_txt',
            text = "Score:" + str(p_score),
            font = 'Open Sans',
            units = None, 
            pos = global_score_pos, height = global_score_size,  wrapWidth = None, ori = 0.0,
            languageStyle = 'LTR',
            color = 'white',  opacity = None,
            depth = -7.0 
        )
        
        # keep track of which components have finished
        p_setupComponents = []
        for thisComponent in p_setupComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "p_setup" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in p_setupComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "p_setup" ---
        for thisComponent in p_setupComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "p_setup" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "p_step1" ---
        continueRoutine = True
        # update component parameters for each repeat
        p_step1_keyresp.keys = []
        p_step1_keyresp.rt = []
        _p_step1_keyresp_allKeys = []
        # Run 'Begin Routine' code from p_step1_code
        p_step1_bg_img.setAutoDraw(True)
        p_step1_leftStim_img.setAutoDraw(True)
        p_step1_rightStim_img.setAutoDraw(True)
        
        p_step1_scoreBg_img.setAutoDraw(True)
        p_step1_score_txt.setAutoDraw(True)
        
        # keep track of which components have finished
        p_step1Components = [p_step1_keyresp]
        for thisComponent in p_step1Components:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "p_step1" ---
        routineForceEnded = not continueRoutine
        while continueRoutine and routineTimer.getTime() < 2.0:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            # is it time to end the Routine? (based on local clock)
            if tThisFlip > 2-frameTolerance:
                continueRoutine = False
            
            # *p_step1_keyresp* updates
            
            # if p_step1_keyresp is starting this frame...
            if p_step1_keyresp.status == NOT_STARTED and t >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                p_step1_keyresp.frameNStart = frameN  # exact frame index
                p_step1_keyresp.tStart = t  # local t and not account for scr refresh
                p_step1_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(p_step1_keyresp, 'tStartRefresh')  # time at next scr refresh
                # update status
                p_step1_keyresp.status = STARTED
                # keyboard checking is just starting
                p_step1_keyresp.clock.reset()  # now t=0
                p_step1_keyresp.clearEvents(eventType='keyboard')
            
            # if p_step1_keyresp is stopping this frame...
            if p_step1_keyresp.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > p_step1_keyresp.tStartRefresh + 1.5-frameTolerance:
                    # keep track of stop time/frame for later
                    p_step1_keyresp.tStop = t  # not accounting for scr refresh
                    p_step1_keyresp.frameNStop = frameN  # exact frame index
                    # update status
                    p_step1_keyresp.status = FINISHED
                    p_step1_keyresp.status = FINISHED
            if p_step1_keyresp.status == STARTED:
                theseKeys = p_step1_keyresp.getKeys(keyList=['s','k'], ignoreKeys=["escape"], waitRelease=False)
                _p_step1_keyresp_allKeys.extend(theseKeys)
                if len(_p_step1_keyresp_allKeys):
                    p_step1_keyresp.keys = _p_step1_keyresp_allKeys[0].name  # just the first key pressed
                    p_step1_keyresp.rt = _p_step1_keyresp_allKeys[0].rt
                    p_step1_keyresp.duration = _p_step1_keyresp_allKeys[0].duration
            # Run 'Each Frame' code from p_step1_code
            if len(p_step1_keyresp.keys) > 0:
                if p_step1_keyresp.keys=="s":
                    p_step1_highlight_img.setPos((-0.5, 0.19))
                    p_step1_rightStim_img.setImage(p_step1_stimRightDeact_file)
                    p_step1_highlight_img.setAutoDraw(True)
                    p_step1_rightStim_img.setAutoDraw(True)
                else:
                    p_step1_highlight_img.setPos((0.5, 0.19))
                    p_step1_leftStim_img.setImage(p_step1_stimLeftDeact_file)
                    p_step1_highlight_img.setAutoDraw(True)
                    p_step1_leftStim_img.setAutoDraw(True)
            
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in p_step1Components:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "p_step1" ---
        for thisComponent in p_step1Components:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # check responses
        if p_step1_keyresp.keys in ['', [], None]:  # No response was made
            p_step1_keyresp.keys = None
        practice.addData('p_step1_keyresp.keys',p_step1_keyresp.keys)
        if p_step1_keyresp.keys != None:  # we had a response
            practice.addData('p_step1_keyresp.rt', p_step1_keyresp.rt)
            practice.addData('p_step1_keyresp.duration', p_step1_keyresp.duration)
        # Run 'End Routine' code from p_step1_code
        if p_step1_keyresp.keys != None:
            p_step2_flag = 1
            if p_step1_keyresp.keys == "s":
                p_step1_choice = p_step1_stimLeft_var
            else:
                p_step1_choice = p_step1_stimRight_var
            p_step2_stim_var = p_step1_choice["step2"]
            p_step2_stimBg_file = p_step2_stim_var["file"]
            p_step2_stimBasket_file = p_step2_stim_var["basket_file"]
            p_points = p_step1_choice["reward"][p_index]
        
            if p_points == 0:
                p_reward_trialPoints_txt = "o"
            else:
                p_reward_trialPoints_txt = "+" + str(p_points)
        else:
            p_failStep1_flag = 1
        
        
        
        
        p_step1_bg_img.setAutoDraw(False)
        p_step1_leftStim_img.setAutoDraw(False)
        p_step1_rightStim_img.setAutoDraw(False)
        p_step1_highlight_img.setAutoDraw(False)
        
        p_step2_bg_img = visual.ImageStim(
            win = win,
            name = 'p_step2_bg_img', units = 'norm', 
            image = p_step2_stimBg_file, mask = None,
            anchor = 'center',
            ori = 0.0, pos = [0, 0], size = [2, 2],
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = 0.0 
        )
        
          
        p_step2_stim_img = visual.ImageStim(
            win = win,
            name = 'p_step2_stim_img', units = 'height',
            image = p_step2_stimBasket_file, mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = global_step2_pos, size = global_step2_stim_size,
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -3.0 
        )
        
        p_step2_highlight_img = visual.ImageStim(
            win = win,
            name = 'p_step2_highlight_img', units = None,
            image = 'ressources/highlight.jpg', mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = [0, 0], size = [0.6, 0.6],
            color = [1,1,1], opacity = None,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -4.0 
        )
          
        p_step2_scoreBg_img = visual.ImageStim(
            win = win,
            name = 'p_step2_scoreBg_img', units = None, 
            image = 'ressources/grey_rectangle.jpg', mask = None,
            anchor = 'top-center',
            ori = 0.0, pos = global_scoreBg_pos, size = global_scoreBg_size,
            color = [0, 0, 0], opacity = 0.9,
            flipHoriz = False, flipVert = False,
            texRes = 128.0, interpolate = True, depth = -5.0 
        )
        
        p_step2_score_txt = visual.TextStim(
            win = win,
            name = "SCORE: " + str(p_score),
            text = p_reward_trialPoints_txt,
            font = 'Open Sans',
            units = None, 
            pos = global_score_pos, height = global_score_size,  wrapWidth = None, ori = 0.0,
            languageStyle = 'LTR',
            color = 'white',  opacity = None,
            depth = -6.0 
        )
        # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
        if routineForceEnded:
            routineTimer.reset()
        else:
            routineTimer.addTime(-2.000000)
        
        # set up handler to look after randomisation of conditions etc
        p_step2_loop = data.TrialHandler(nReps=p_step2_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='p_step2_loop')
        thisExp.addLoop(p_step2_loop)  # add the loop to the experiment
        thisP_step2_loop = p_step2_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisP_step2_loop.rgb)
        if thisP_step2_loop != None:
            for paramName in thisP_step2_loop:
                globals()[paramName] = thisP_step2_loop[paramName]
        
        for thisP_step2_loop in p_step2_loop:
            currentLoop = p_step2_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisP_step2_loop.rgb)
            if thisP_step2_loop != None:
                for paramName in thisP_step2_loop:
                    globals()[paramName] = thisP_step2_loop[paramName]
            
            # --- Prepare to start Routine "p_step2" ---
            continueRoutine = True
            # update component parameters for each repeat
            p_step2_keyresp.keys = []
            p_step2_keyresp.rt = []
            _p_step2_keyresp_allKeys = []
            # Run 'Begin Routine' code from p_step2_code
            p_step2_highlight_flag = False
            
            p_step2_bg_img.setAutoDraw(True)
            p_step2_stim_img.setAutoDraw(True)
            p_step2_scoreBg_img.setAutoDraw(True)
            p_step2_score_txt.setAutoDraw(True)
            # keep track of which components have finished
            p_step2Components = [p_step2_keyresp]
            for thisComponent in p_step2Components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "p_step2" ---
            routineForceEnded = not continueRoutine
            while continueRoutine and routineTimer.getTime() < 1.5:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 1.5-frameTolerance:
                    continueRoutine = False
                
                # *p_step2_keyresp* updates
                
                # if p_step2_keyresp is starting this frame...
                if p_step2_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_step2_keyresp.frameNStart = frameN  # exact frame index
                    p_step2_keyresp.tStart = t  # local t and not account for scr refresh
                    p_step2_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_step2_keyresp, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_step2_keyresp.status = STARTED
                    # keyboard checking is just starting
                    p_step2_keyresp.clock.reset()  # now t=0
                    p_step2_keyresp.clearEvents(eventType='keyboard')
                
                # if p_step2_keyresp is stopping this frame...
                if p_step2_keyresp.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > p_step2_keyresp.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        p_step2_keyresp.tStop = t  # not accounting for scr refresh
                        p_step2_keyresp.frameNStop = frameN  # exact frame index
                        # update status
                        p_step2_keyresp.status = FINISHED
                        p_step2_keyresp.status = FINISHED
                if p_step2_keyresp.status == STARTED:
                    theseKeys = p_step2_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                    _p_step2_keyresp_allKeys.extend(theseKeys)
                    if len(_p_step2_keyresp_allKeys):
                        p_step2_keyresp.keys = _p_step2_keyresp_allKeys[0].name  # just the first key pressed
                        p_step2_keyresp.rt = _p_step2_keyresp_allKeys[0].rt
                        p_step2_keyresp.duration = _p_step2_keyresp_allKeys[0].duration
                # Run 'Each Frame' code from p_step2_code
                if len(p_step2_keyresp.keys) > 0:
                    p_step2_highlight_img.setAutoDraw(True)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in p_step2Components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "p_step2" ---
            for thisComponent in p_step2Components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if p_step2_keyresp.keys in ['', [], None]:  # No response was made
                p_step2_keyresp.keys = None
            p_step2_loop.addData('p_step2_keyresp.keys',p_step2_keyresp.keys)
            if p_step2_keyresp.keys != None:  # we had a response
                p_step2_loop.addData('p_step2_keyresp.rt', p_step2_keyresp.rt)
                p_step2_loop.addData('p_step2_keyresp.duration', p_step2_keyresp.duration)
            # Run 'End Routine' code from p_step2_code
            if p_step2_keyresp.keys=="space":
                p_reward_flag = 1
            else:
                p_failStep2_flag = 1
                p_points = 0
            
            
            p_step2_highlight_img.setAutoDraw(False)
            p_step2_bg_img.setAutoDraw(False)
            p_step2_scoreBg_img.setAutoDraw(False)
            p_step2_score_txt.setAutoDraw(False)
            # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
            if routineForceEnded:
                routineTimer.reset()
            else:
                routineTimer.addTime(-1.500000)
        # completed p_step2_flag repeats of 'p_step2_loop'
        
        
        # set up handler to look after randomisation of conditions etc
        p_reward_loop = data.TrialHandler(nReps=p_reward_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='p_reward_loop')
        thisExp.addLoop(p_reward_loop)  # add the loop to the experiment
        thisP_reward_loop = p_reward_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisP_reward_loop.rgb)
        if thisP_reward_loop != None:
            for paramName in thisP_reward_loop:
                globals()[paramName] = thisP_reward_loop[paramName]
        
        for thisP_reward_loop in p_reward_loop:
            currentLoop = p_reward_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisP_reward_loop.rgb)
            if thisP_reward_loop != None:
                for paramName in thisP_reward_loop:
                    globals()[paramName] = thisP_reward_loop[paramName]
            
            # --- Prepare to start Routine "p_reward" ---
            continueRoutine = True
            # update component parameters for each repeat
            p_reward_bg_img.setImage(p_step2_stimBg_file)
            p_reward_step2Stim_img.setImage(p_step2_stimBasket_file)
            p_reward_rewardAmount_txt.setText(p_reward_trialPoints_txt)
            # Run 'Begin Routine' code from p_reward_updateScore_code
            p_score = p_score + p_points
            p_reward_mushroom_var = "ressources/mush" + str(p_points) + ".jpg"
            p_reward_score_txt.setText("SCORE: " + str(p_score))
            p_reward_mushroom_img.setImage(p_reward_mushroom_var)
            # keep track of which components have finished
            p_rewardComponents = [p_reward_bg_img, p_reward_step2Stim_img, p_reward_step2Highlight_img, p_reward_scoreBg_img, p_reward_rewardAmount_txt, p_reward_score_txt, p_reward_mushroom_img]
            for thisComponent in p_rewardComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "p_reward" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 2-frameTolerance:
                    continueRoutine = False
                
                # *p_reward_bg_img* updates
                
                # if p_reward_bg_img is starting this frame...
                if p_reward_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_bg_img.frameNStart = frameN  # exact frame index
                    p_reward_bg_img.tStart = t  # local t and not account for scr refresh
                    p_reward_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_bg_img.status = STARTED
                    p_reward_bg_img.setAutoDraw(True)
                
                # if p_reward_bg_img is active this frame...
                if p_reward_bg_img.status == STARTED:
                    # update params
                    pass
                
                # *p_reward_step2Stim_img* updates
                
                # if p_reward_step2Stim_img is starting this frame...
                if p_reward_step2Stim_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_step2Stim_img.frameNStart = frameN  # exact frame index
                    p_reward_step2Stim_img.tStart = t  # local t and not account for scr refresh
                    p_reward_step2Stim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_step2Stim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_step2Stim_img.status = STARTED
                    p_reward_step2Stim_img.setAutoDraw(True)
                
                # if p_reward_step2Stim_img is active this frame...
                if p_reward_step2Stim_img.status == STARTED:
                    # update params
                    pass
                
                # if p_reward_step2Stim_img is stopping this frame...
                if p_reward_step2Stim_img.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > p_reward_step2Stim_img.tStartRefresh + 2-frameTolerance:
                        # keep track of stop time/frame for later
                        p_reward_step2Stim_img.tStop = t  # not accounting for scr refresh
                        p_reward_step2Stim_img.frameNStop = frameN  # exact frame index
                        # update status
                        p_reward_step2Stim_img.status = FINISHED
                        p_reward_step2Stim_img.setAutoDraw(False)
                
                # *p_reward_step2Highlight_img* updates
                
                # if p_reward_step2Highlight_img is starting this frame...
                if p_reward_step2Highlight_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_step2Highlight_img.frameNStart = frameN  # exact frame index
                    p_reward_step2Highlight_img.tStart = t  # local t and not account for scr refresh
                    p_reward_step2Highlight_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_step2Highlight_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_step2Highlight_img.status = STARTED
                    p_reward_step2Highlight_img.setAutoDraw(True)
                
                # if p_reward_step2Highlight_img is active this frame...
                if p_reward_step2Highlight_img.status == STARTED:
                    # update params
                    p_reward_step2Highlight_img.setPos((0, .05), log=False)
                
                # *p_reward_scoreBg_img* updates
                
                # if p_reward_scoreBg_img is starting this frame...
                if p_reward_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_scoreBg_img.frameNStart = frameN  # exact frame index
                    p_reward_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    p_reward_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_scoreBg_img.status = STARTED
                    p_reward_scoreBg_img.setAutoDraw(True)
                
                # if p_reward_scoreBg_img is active this frame...
                if p_reward_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *p_reward_rewardAmount_txt* updates
                
                # if p_reward_rewardAmount_txt is starting this frame...
                if p_reward_rewardAmount_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_rewardAmount_txt.frameNStart = frameN  # exact frame index
                    p_reward_rewardAmount_txt.tStart = t  # local t and not account for scr refresh
                    p_reward_rewardAmount_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_rewardAmount_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_rewardAmount_txt.status = STARTED
                    p_reward_rewardAmount_txt.setAutoDraw(True)
                
                # if p_reward_rewardAmount_txt is active this frame...
                if p_reward_rewardAmount_txt.status == STARTED:
                    # update params
                    pass
                
                # *p_reward_score_txt* updates
                
                # if p_reward_score_txt is starting this frame...
                if p_reward_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_score_txt.frameNStart = frameN  # exact frame index
                    p_reward_score_txt.tStart = t  # local t and not account for scr refresh
                    p_reward_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_score_txt.status = STARTED
                    p_reward_score_txt.setAutoDraw(True)
                
                # if p_reward_score_txt is active this frame...
                if p_reward_score_txt.status == STARTED:
                    # update params
                    pass
                
                # *p_reward_mushroom_img* updates
                
                # if p_reward_mushroom_img is starting this frame...
                if p_reward_mushroom_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_reward_mushroom_img.frameNStart = frameN  # exact frame index
                    p_reward_mushroom_img.tStart = t  # local t and not account for scr refresh
                    p_reward_mushroom_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_reward_mushroom_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_reward_mushroom_img.status = STARTED
                    p_reward_mushroom_img.setAutoDraw(True)
                
                # if p_reward_mushroom_img is active this frame...
                if p_reward_mushroom_img.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in p_rewardComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "p_reward" ---
            for thisComponent in p_rewardComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # the Routine "p_reward" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed p_reward_flag repeats of 'p_reward_loop'
        
        
        # set up handler to look after randomisation of conditions etc
        p_failStep1_loop = data.TrialHandler(nReps=p_failStep1_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='p_failStep1_loop')
        thisExp.addLoop(p_failStep1_loop)  # add the loop to the experiment
        thisP_failStep1_loop = p_failStep1_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisP_failStep1_loop.rgb)
        if thisP_failStep1_loop != None:
            for paramName in thisP_failStep1_loop:
                globals()[paramName] = thisP_failStep1_loop[paramName]
        
        for thisP_failStep1_loop in p_failStep1_loop:
            currentLoop = p_failStep1_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisP_failStep1_loop.rgb)
            if thisP_failStep1_loop != None:
                for paramName in thisP_failStep1_loop:
                    globals()[paramName] = thisP_failStep1_loop[paramName]
            
            # --- Prepare to start Routine "p_failStep1" ---
            continueRoutine = True
            # update component parameters for each repeat
            p_failStep1_leftStim_img.setImage(p_step1_stimLeftDeact_file)
            p_failStep1_rightStim_img.setImage(p_step1_stimRightDeact_file)
            p_fail_score_txt.setText("SCORE: " + str(p_score))
            # keep track of which components have finished
            p_failStep1Components = [p_failStep1_bg_img, p_failStep1_leftStim_img, p_failStep1_rightStim_img, p_failStep1_scoreBg_img, p_fail_score_txt]
            for thisComponent in p_failStep1Components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "p_failStep1" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 1-frameTolerance:
                    continueRoutine = False
                
                # *p_failStep1_bg_img* updates
                
                # if p_failStep1_bg_img is starting this frame...
                if p_failStep1_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep1_bg_img.frameNStart = frameN  # exact frame index
                    p_failStep1_bg_img.tStart = t  # local t and not account for scr refresh
                    p_failStep1_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep1_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep1_bg_img.status = STARTED
                    p_failStep1_bg_img.setAutoDraw(True)
                
                # if p_failStep1_bg_img is active this frame...
                if p_failStep1_bg_img.status == STARTED:
                    # update params
                    pass
                
                # *p_failStep1_leftStim_img* updates
                
                # if p_failStep1_leftStim_img is starting this frame...
                if p_failStep1_leftStim_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep1_leftStim_img.frameNStart = frameN  # exact frame index
                    p_failStep1_leftStim_img.tStart = t  # local t and not account for scr refresh
                    p_failStep1_leftStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep1_leftStim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep1_leftStim_img.status = STARTED
                    p_failStep1_leftStim_img.setAutoDraw(True)
                
                # if p_failStep1_leftStim_img is active this frame...
                if p_failStep1_leftStim_img.status == STARTED:
                    # update params
                    pass
                
                # *p_failStep1_rightStim_img* updates
                
                # if p_failStep1_rightStim_img is starting this frame...
                if p_failStep1_rightStim_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep1_rightStim_img.frameNStart = frameN  # exact frame index
                    p_failStep1_rightStim_img.tStart = t  # local t and not account for scr refresh
                    p_failStep1_rightStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep1_rightStim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep1_rightStim_img.status = STARTED
                    p_failStep1_rightStim_img.setAutoDraw(True)
                
                # if p_failStep1_rightStim_img is active this frame...
                if p_failStep1_rightStim_img.status == STARTED:
                    # update params
                    pass
                
                # *p_failStep1_scoreBg_img* updates
                
                # if p_failStep1_scoreBg_img is starting this frame...
                if p_failStep1_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep1_scoreBg_img.frameNStart = frameN  # exact frame index
                    p_failStep1_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    p_failStep1_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep1_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep1_scoreBg_img.status = STARTED
                    p_failStep1_scoreBg_img.setAutoDraw(True)
                
                # if p_failStep1_scoreBg_img is active this frame...
                if p_failStep1_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *p_fail_score_txt* updates
                
                # if p_fail_score_txt is starting this frame...
                if p_fail_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_fail_score_txt.frameNStart = frameN  # exact frame index
                    p_fail_score_txt.tStart = t  # local t and not account for scr refresh
                    p_fail_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_fail_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_fail_score_txt.status = STARTED
                    p_fail_score_txt.setAutoDraw(True)
                
                # if p_fail_score_txt is active this frame...
                if p_fail_score_txt.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in p_failStep1Components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "p_failStep1" ---
            for thisComponent in p_failStep1Components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # the Routine "p_failStep1" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed p_failStep1_flag repeats of 'p_failStep1_loop'
        
        
        # set up handler to look after randomisation of conditions etc
        p_failStep2_loop = data.TrialHandler(nReps=p_failStep2_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='p_failStep2_loop')
        thisExp.addLoop(p_failStep2_loop)  # add the loop to the experiment
        thisP_failStep2_loop = p_failStep2_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisP_failStep2_loop.rgb)
        if thisP_failStep2_loop != None:
            for paramName in thisP_failStep2_loop:
                globals()[paramName] = thisP_failStep2_loop[paramName]
        
        for thisP_failStep2_loop in p_failStep2_loop:
            currentLoop = p_failStep2_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisP_failStep2_loop.rgb)
            if thisP_failStep2_loop != None:
                for paramName in thisP_failStep2_loop:
                    globals()[paramName] = thisP_failStep2_loop[paramName]
            
            # --- Prepare to start Routine "p_failStep2" ---
            continueRoutine = True
            # update component parameters for each repeat
            p_failStep2_bg_img.setImage('')
            p_failStep2_stim_img.setImage('ressources/fail_basket.png')
            p_failStep2_score_txt.setText("SCORE: " + str(p_score))
            # keep track of which components have finished
            p_failStep2Components = [p_failStep2_bg_img, p_failStep2_stim_img, p_failStep2_scoreBg_img, p_failStep2_score_txt]
            for thisComponent in p_failStep2Components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "p_failStep2" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 1-frameTolerance:
                    continueRoutine = False
                
                # *p_failStep2_bg_img* updates
                
                # if p_failStep2_bg_img is starting this frame...
                if p_failStep2_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep2_bg_img.frameNStart = frameN  # exact frame index
                    p_failStep2_bg_img.tStart = t  # local t and not account for scr refresh
                    p_failStep2_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep2_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep2_bg_img.status = STARTED
                    p_failStep2_bg_img.setAutoDraw(True)
                
                # if p_failStep2_bg_img is active this frame...
                if p_failStep2_bg_img.status == STARTED:
                    # update params
                    pass
                
                # *p_failStep2_stim_img* updates
                
                # if p_failStep2_stim_img is starting this frame...
                if p_failStep2_stim_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep2_stim_img.frameNStart = frameN  # exact frame index
                    p_failStep2_stim_img.tStart = t  # local t and not account for scr refresh
                    p_failStep2_stim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep2_stim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep2_stim_img.status = STARTED
                    p_failStep2_stim_img.setAutoDraw(True)
                
                # if p_failStep2_stim_img is active this frame...
                if p_failStep2_stim_img.status == STARTED:
                    # update params
                    pass
                
                # if p_failStep2_stim_img is stopping this frame...
                if p_failStep2_stim_img.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > p_failStep2_stim_img.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        p_failStep2_stim_img.tStop = t  # not accounting for scr refresh
                        p_failStep2_stim_img.frameNStop = frameN  # exact frame index
                        # update status
                        p_failStep2_stim_img.status = FINISHED
                        p_failStep2_stim_img.setAutoDraw(False)
                
                # *p_failStep2_scoreBg_img* updates
                
                # if p_failStep2_scoreBg_img is starting this frame...
                if p_failStep2_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep2_scoreBg_img.frameNStart = frameN  # exact frame index
                    p_failStep2_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    p_failStep2_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep2_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep2_scoreBg_img.status = STARTED
                    p_failStep2_scoreBg_img.setAutoDraw(True)
                
                # if p_failStep2_scoreBg_img is active this frame...
                if p_failStep2_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *p_failStep2_score_txt* updates
                
                # if p_failStep2_score_txt is starting this frame...
                if p_failStep2_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    p_failStep2_score_txt.frameNStart = frameN  # exact frame index
                    p_failStep2_score_txt.tStart = t  # local t and not account for scr refresh
                    p_failStep2_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(p_failStep2_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    p_failStep2_score_txt.status = STARTED
                    p_failStep2_score_txt.setAutoDraw(True)
                
                # if p_failStep2_score_txt is active this frame...
                if p_failStep2_score_txt.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in p_failStep2Components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "p_failStep2" ---
            for thisComponent in p_failStep2Components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # the Routine "p_failStep2" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed p_failStep2_flag repeats of 'p_failStep2_loop'
        
        
        # --- Prepare to start Routine "p_data" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from p_data_code
        thisExp.addData("p_step1_pair_index", pair_index)
        thisExp.addData("p_step1_stimLeft_name", p_step1_stimLeft_var["name"])
        thisExp.addData("p_step1_stimLeft_pair", p_step1_stimLeft_var["pair"])
        thisExp.addData("p_step1_stimLeft_reward", p_step1_stimLeft_var["step2"]["reward"][p_index])
        thisExp.addData("p_step1_stimLeft_step2Stim", p_step1_stimLeft_var["step2"]["name"])
        thisExp.addData("p_step1_stimLeft_step2Basket", p_step1_stimLeft_var["step2"]["basket_name"])
        thisExp.addData("p_step1_stimRight_name", p_step1_stimRight_var["name"])
        thisExp.addData("p_step1_stimRight_pair", p_step1_stimRight_var["pair"])
        thisExp.addData("p_step1_stimRight_reward", p_step1_stimRight_var["step2"]["reward"][p_index])
        thisExp.addData("p_step1_stimRight_step2Stim", p_step1_stimRight_var["step2"]["name"])
        thisExp.addData("p_step1_stimRight_step2Basket", p_step1_stimRight_var["step2"]["basket_name"])
        thisExp.addData("p_points", p_points)
        thisExp.addData("p_fail_step1", p_failStep1_flag)
        thisExp.addData("p_fail_step2", p_failStep2_flag)
        thisExp.addData("p_reward_flag", p_reward_flag)
        thisExp.addData("p_step1_choice", p_step1_choice["name"])
        thisExp.addData("p_step2_stim", p_step2_stim_var["name"])
        thisExp.addData("p_step2_basket", p_step2_stim_var["basket_name"])
        thisExp.addData("p_score", p_score)
        
        p_index += 1
        # keep track of which components have finished
        p_dataComponents = []
        for thisComponent in p_dataComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "p_data" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in p_dataComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "p_data" ---
        for thisComponent in p_dataComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "p_data" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 5.0 repeats of 'practice'
    
    
    # --- Prepare to start Routine "t_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    t_instructions_keyresp.keys = []
    t_instructions_keyresp.rt = []
    _t_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    t_instructionsComponents = [t_instructions_text, t_instructions_keyresp]
    for thisComponent in t_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "t_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *t_instructions_text* updates
        
        # if t_instructions_text is starting this frame...
        if t_instructions_text.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            t_instructions_text.frameNStart = frameN  # exact frame index
            t_instructions_text.tStart = t  # local t and not account for scr refresh
            t_instructions_text.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(t_instructions_text, 'tStartRefresh')  # time at next scr refresh
            # update status
            t_instructions_text.status = STARTED
            t_instructions_text.setAutoDraw(True)
        
        # if t_instructions_text is active this frame...
        if t_instructions_text.status == STARTED:
            # update params
            pass
        
        # *t_instructions_keyresp* updates
        
        # if t_instructions_keyresp is starting this frame...
        if t_instructions_keyresp.status == NOT_STARTED and t >= 0-frameTolerance:
            # keep track of start time/frame for later
            t_instructions_keyresp.frameNStart = frameN  # exact frame index
            t_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            t_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(t_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            t_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            t_instructions_keyresp.clock.reset()  # now t=0
            t_instructions_keyresp.clearEvents(eventType='keyboard')
        if t_instructions_keyresp.status == STARTED:
            theseKeys = t_instructions_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
            _t_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_t_instructions_keyresp_allKeys):
                t_instructions_keyresp.keys = _t_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                t_instructions_keyresp.rt = _t_instructions_keyresp_allKeys[-1].rt
                t_instructions_keyresp.duration = _t_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in t_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "t_instructions" ---
    for thisComponent in t_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if t_instructions_keyresp.keys in ['', [], None]:  # No response was made
        t_instructions_keyresp.keys = None
    thisExp.addData('t_instructions_keyresp.keys',t_instructions_keyresp.keys)
    if t_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('t_instructions_keyresp.rt', t_instructions_keyresp.rt)
        thisExp.addData('t_instructions_keyresp.duration', t_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "t_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    trials = data.TrialHandler(nReps=50.0, method='fullRandom', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('trials_pairIndex.csv'),
        seed=None, name='trials')
    thisExp.addLoop(trials)  # add the loop to the experiment
    thisTrial = trials.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
    if thisTrial != None:
        for paramName in thisTrial:
            globals()[paramName] = thisTrial[paramName]
    
    for thisTrial in trials:
        currentLoop = trials
        thisExp.timestampOnFlip(win, 'thisRow.t')
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                inputs=inputs, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
        if thisTrial != None:
            for paramName in thisTrial:
                globals()[paramName] = thisTrial[paramName]
        
        # --- Prepare to start Routine "t_setup" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from t_setup_code
        # flags
        t_step2_flag = 0
        t_reward_flag = 0
        t_failStep1_flag = 0
        t_failStep2_flag = 0
        
        
        t_points = 0
        t_step1_pair = []
        
        for stim in l_t_step1_stims:
            if stim["pair"] == pair_index: #from csv file
                t_step1_pair.append(stim)
        random.shuffle(t_step1_pair)
        
        t_step1_stimLeft_var = t_step1_pair[0]
        t_step1_stimRight_var = t_step1_pair[1]
        
        # keep track of which components have finished
        t_setupComponents = []
        for thisComponent in t_setupComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "t_setup" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in t_setupComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "t_setup" ---
        for thisComponent in t_setupComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "t_setup" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "t_step1" ---
        continueRoutine = True
        # update component parameters for each repeat
        t_step1_keyresp.keys = []
        t_step1_keyresp.rt = []
        _t_step1_keyresp_allKeys = []
        # Run 'Begin Routine' code from t_step1_code
        t_step1_highlight_flag = False
        t_step1_highlight_pos = [0, 0]
        
        t_step1_deact_flag = False
        t_step1_deact_pos = [0, 0]
        t_step1_deact_img = "ressources/mush0.png"
        
        t_step1_leftStim_img.setImage(t_step1_stimLeft_var["file"])
        t_step1_rightStim_img.setImage(t_step1_stimRight_var["file"])
        t_step1_score_txt.setText("SCORE: " + str(global_score))
        # keep track of which components have finished
        t_step1Components = [t_step1_bg_img, t_step1_keyresp, t_step1_leftStim_img, t_step1_rightStim_img, t_step1_highlight_img, t_step1_scoreBg_img, t_step1_score_txt, t_step1_unchosenDeact_img]
        for thisComponent in t_step1Components:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "t_step1" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            # is it time to end the Routine? (based on local clock)
            if tThisFlip > 2-frameTolerance:
                continueRoutine = False
            
            # *t_step1_bg_img* updates
            
            # if t_step1_bg_img is starting this frame...
            if t_step1_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                # keep track of start time/frame for later
                t_step1_bg_img.frameNStart = frameN  # exact frame index
                t_step1_bg_img.tStart = t  # local t and not account for scr refresh
                t_step1_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_bg_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_bg_img.status = STARTED
                t_step1_bg_img.setAutoDraw(True)
            
            # if t_step1_bg_img is active this frame...
            if t_step1_bg_img.status == STARTED:
                # update params
                pass
            
            # if t_step1_bg_img is stopping this frame...
            if t_step1_bg_img.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > t_step1_bg_img.tStartRefresh + 2-frameTolerance:
                    # keep track of stop time/frame for later
                    t_step1_bg_img.tStop = t  # not accounting for scr refresh
                    t_step1_bg_img.frameNStop = frameN  # exact frame index
                    # update status
                    t_step1_bg_img.status = FINISHED
                    t_step1_bg_img.setAutoDraw(False)
            
            # *t_step1_keyresp* updates
            
            # if t_step1_keyresp is starting this frame...
            if t_step1_keyresp.status == NOT_STARTED and t >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                t_step1_keyresp.frameNStart = frameN  # exact frame index
                t_step1_keyresp.tStart = t  # local t and not account for scr refresh
                t_step1_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_keyresp, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_keyresp.status = STARTED
                # keyboard checking is just starting
                t_step1_keyresp.clock.reset()  # now t=0
                t_step1_keyresp.clearEvents(eventType='keyboard')
            
            # if t_step1_keyresp is stopping this frame...
            if t_step1_keyresp.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > t_step1_keyresp.tStartRefresh + 1.5-frameTolerance:
                    # keep track of stop time/frame for later
                    t_step1_keyresp.tStop = t  # not accounting for scr refresh
                    t_step1_keyresp.frameNStop = frameN  # exact frame index
                    # update status
                    t_step1_keyresp.status = FINISHED
                    t_step1_keyresp.status = FINISHED
            if t_step1_keyresp.status == STARTED:
                theseKeys = t_step1_keyresp.getKeys(keyList=['s','k'], ignoreKeys=["escape"], waitRelease=False)
                _t_step1_keyresp_allKeys.extend(theseKeys)
                if len(_t_step1_keyresp_allKeys):
                    t_step1_keyresp.keys = _t_step1_keyresp_allKeys[0].name  # just the first key pressed
                    t_step1_keyresp.rt = _t_step1_keyresp_allKeys[0].rt
                    t_step1_keyresp.duration = _t_step1_keyresp_allKeys[0].duration
            # Run 'Each Frame' code from t_step1_code
            if len(t_step1_keyresp.keys) > 0:
                t_step1_highlight_flag = True
                t_step1_deact_flag = True
                if t_step1_keyresp.keys=="s":
                    t_step1_highlight_pos = (-0.5, 0.19)
                    t_step1_deact_img = t_step1_stimRight_var["deact_file"]
                    t_step1_deact_pos = global_step1_stimRight_pos
                else:
                    t_step1_highlight_pos = (0.5, 0.19)
                    t_step1_deact_img = t_step1_stimLeft_var["deact_file"]
                    t_step1_deact_pos = global_step1_stimLeft_pos
            
            # *t_step1_leftStim_img* updates
            
            # if t_step1_leftStim_img is starting this frame...
            if t_step1_leftStim_img.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                t_step1_leftStim_img.frameNStart = frameN  # exact frame index
                t_step1_leftStim_img.tStart = t  # local t and not account for scr refresh
                t_step1_leftStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_leftStim_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_leftStim_img.status = STARTED
                t_step1_leftStim_img.setAutoDraw(True)
            
            # if t_step1_leftStim_img is active this frame...
            if t_step1_leftStim_img.status == STARTED:
                # update params
                pass
            
            # if t_step1_leftStim_img is stopping this frame...
            if t_step1_leftStim_img.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > t_step1_leftStim_img.tStartRefresh + 1.5-frameTolerance:
                    # keep track of stop time/frame for later
                    t_step1_leftStim_img.tStop = t  # not accounting for scr refresh
                    t_step1_leftStim_img.frameNStop = frameN  # exact frame index
                    # update status
                    t_step1_leftStim_img.status = FINISHED
                    t_step1_leftStim_img.setAutoDraw(False)
            
            # *t_step1_rightStim_img* updates
            
            # if t_step1_rightStim_img is starting this frame...
            if t_step1_rightStim_img.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
                # keep track of start time/frame for later
                t_step1_rightStim_img.frameNStart = frameN  # exact frame index
                t_step1_rightStim_img.tStart = t  # local t and not account for scr refresh
                t_step1_rightStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_rightStim_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_rightStim_img.status = STARTED
                t_step1_rightStim_img.setAutoDraw(True)
            
            # if t_step1_rightStim_img is active this frame...
            if t_step1_rightStim_img.status == STARTED:
                # update params
                pass
            
            # if t_step1_rightStim_img is stopping this frame...
            if t_step1_rightStim_img.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > t_step1_rightStim_img.tStartRefresh + 1.5-frameTolerance:
                    # keep track of stop time/frame for later
                    t_step1_rightStim_img.tStop = t  # not accounting for scr refresh
                    t_step1_rightStim_img.frameNStop = frameN  # exact frame index
                    # update status
                    t_step1_rightStim_img.status = FINISHED
                    t_step1_rightStim_img.setAutoDraw(False)
            
            # *t_step1_highlight_img* updates
            
            # if t_step1_highlight_img is starting this frame...
            if t_step1_highlight_img.status == NOT_STARTED and t_step1_highlight_flag:
                # keep track of start time/frame for later
                t_step1_highlight_img.frameNStart = frameN  # exact frame index
                t_step1_highlight_img.tStart = t  # local t and not account for scr refresh
                t_step1_highlight_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_highlight_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_highlight_img.status = STARTED
                t_step1_highlight_img.setAutoDraw(True)
            
            # if t_step1_highlight_img is active this frame...
            if t_step1_highlight_img.status == STARTED:
                # update params
                t_step1_highlight_img.setPos(t_step1_highlight_pos, log=False)
            
            # *t_step1_scoreBg_img* updates
            
            # if t_step1_scoreBg_img is starting this frame...
            if t_step1_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                t_step1_scoreBg_img.frameNStart = frameN  # exact frame index
                t_step1_scoreBg_img.tStart = t  # local t and not account for scr refresh
                t_step1_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_scoreBg_img.status = STARTED
                t_step1_scoreBg_img.setAutoDraw(True)
            
            # if t_step1_scoreBg_img is active this frame...
            if t_step1_scoreBg_img.status == STARTED:
                # update params
                pass
            
            # *t_step1_score_txt* updates
            
            # if t_step1_score_txt is starting this frame...
            if t_step1_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                # keep track of start time/frame for later
                t_step1_score_txt.frameNStart = frameN  # exact frame index
                t_step1_score_txt.tStart = t  # local t and not account for scr refresh
                t_step1_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_score_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_score_txt.status = STARTED
                t_step1_score_txt.setAutoDraw(True)
            
            # if t_step1_score_txt is active this frame...
            if t_step1_score_txt.status == STARTED:
                # update params
                pass
            
            # if t_step1_score_txt is stopping this frame...
            if t_step1_score_txt.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > t_step1_score_txt.tStartRefresh + 2-frameTolerance:
                    # keep track of stop time/frame for later
                    t_step1_score_txt.tStop = t  # not accounting for scr refresh
                    t_step1_score_txt.frameNStop = frameN  # exact frame index
                    # update status
                    t_step1_score_txt.status = FINISHED
                    t_step1_score_txt.setAutoDraw(False)
            
            # *t_step1_unchosenDeact_img* updates
            
            # if t_step1_unchosenDeact_img is starting this frame...
            if t_step1_unchosenDeact_img.status == NOT_STARTED and t_step1_deact_flag:
                # keep track of start time/frame for later
                t_step1_unchosenDeact_img.frameNStart = frameN  # exact frame index
                t_step1_unchosenDeact_img.tStart = t  # local t and not account for scr refresh
                t_step1_unchosenDeact_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(t_step1_unchosenDeact_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                t_step1_unchosenDeact_img.status = STARTED
                t_step1_unchosenDeact_img.setAutoDraw(True)
            
            # if t_step1_unchosenDeact_img is active this frame...
            if t_step1_unchosenDeact_img.status == STARTED:
                # update params
                t_step1_unchosenDeact_img.setPos(t_step1_deact_pos, log=False)
                t_step1_unchosenDeact_img.setImage(t_step1_deact_img, log=False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in t_step1Components:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "t_step1" ---
        for thisComponent in t_step1Components:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # check responses
        if t_step1_keyresp.keys in ['', [], None]:  # No response was made
            t_step1_keyresp.keys = None
        trials.addData('t_step1_keyresp.keys',t_step1_keyresp.keys)
        if t_step1_keyresp.keys != None:  # we had a response
            trials.addData('t_step1_keyresp.rt', t_step1_keyresp.rt)
            trials.addData('t_step1_keyresp.duration', t_step1_keyresp.duration)
        # Run 'End Routine' code from t_step1_code
        if t_step1_keyresp.keys != None:
            t_step2_flag = 1
            if t_step1_keyresp.keys == "s":
                t_step1_choice = t_step1_stimLeft_var
            else:
                t_step1_choice = t_step1_stimRight_var
            t_step2_stim_var = t_step1_choice["step2"]
            t_points = t_step1_choice["reward"]
            if t_points == 0:
                t_reward_trialPoints_txt = "o"
            else:
                t_reward_trialPoints_txt = "+" + str(t_points)
        else:
            t_failStep1_flag = 1
        
        # the Routine "t_step1" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # set up handler to look after randomisation of conditions etc
        t_step2_loop = data.TrialHandler(nReps=t_step2_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='t_step2_loop')
        thisExp.addLoop(t_step2_loop)  # add the loop to the experiment
        thisT_step2_loop = t_step2_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisT_step2_loop.rgb)
        if thisT_step2_loop != None:
            for paramName in thisT_step2_loop:
                globals()[paramName] = thisT_step2_loop[paramName]
        
        for thisT_step2_loop in t_step2_loop:
            currentLoop = t_step2_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisT_step2_loop.rgb)
            if thisT_step2_loop != None:
                for paramName in thisT_step2_loop:
                    globals()[paramName] = thisT_step2_loop[paramName]
            
            # --- Prepare to start Routine "t_step2" ---
            continueRoutine = True
            # update component parameters for each repeat
            t_step2_bg_img.setImage(t_step2_stim_var["file"])
            t_step2_keyresp.keys = []
            t_step2_keyresp.rt = []
            _t_step2_keyresp_allKeys = []
            # Run 'Begin Routine' code from t_step2_code
            t_step2_highlight_flag = False
            
            t_step2_stim_img.setImage(t_step2_stim_var["basket_file"])
            t_step2_score_txt.setText("SCORE: " + str(global_score))
            # keep track of which components have finished
            t_step2Components = [t_step2_bg_img, t_step2_keyresp, t_step2_stim_img, t_step2_highlight_img, t_step2_scoreBg_img, t_step2_score_txt]
            for thisComponent in t_step2Components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "t_step2" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 1.5-frameTolerance:
                    continueRoutine = False
                
                # *t_step2_bg_img* updates
                
                # if t_step2_bg_img is starting this frame...
                if t_step2_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_step2_bg_img.frameNStart = frameN  # exact frame index
                    t_step2_bg_img.tStart = t  # local t and not account for scr refresh
                    t_step2_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_step2_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_step2_bg_img.status = STARTED
                    t_step2_bg_img.setAutoDraw(True)
                
                # if t_step2_bg_img is active this frame...
                if t_step2_bg_img.status == STARTED:
                    # update params
                    pass
                
                # if t_step2_bg_img is stopping this frame...
                if t_step2_bg_img.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > t_step2_bg_img.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        t_step2_bg_img.tStop = t  # not accounting for scr refresh
                        t_step2_bg_img.frameNStop = frameN  # exact frame index
                        # update status
                        t_step2_bg_img.status = FINISHED
                        t_step2_bg_img.setAutoDraw(False)
                
                # *t_step2_keyresp* updates
                
                # if t_step2_keyresp is starting this frame...
                if t_step2_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_step2_keyresp.frameNStart = frameN  # exact frame index
                    t_step2_keyresp.tStart = t  # local t and not account for scr refresh
                    t_step2_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_step2_keyresp, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_step2_keyresp.status = STARTED
                    # keyboard checking is just starting
                    t_step2_keyresp.clock.reset()  # now t=0
                    t_step2_keyresp.clearEvents(eventType='keyboard')
                
                # if t_step2_keyresp is stopping this frame...
                if t_step2_keyresp.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > t_step2_keyresp.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        t_step2_keyresp.tStop = t  # not accounting for scr refresh
                        t_step2_keyresp.frameNStop = frameN  # exact frame index
                        # update status
                        t_step2_keyresp.status = FINISHED
                        t_step2_keyresp.status = FINISHED
                if t_step2_keyresp.status == STARTED:
                    theseKeys = t_step2_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                    _t_step2_keyresp_allKeys.extend(theseKeys)
                    if len(_t_step2_keyresp_allKeys):
                        t_step2_keyresp.keys = _t_step2_keyresp_allKeys[0].name  # just the first key pressed
                        t_step2_keyresp.rt = _t_step2_keyresp_allKeys[0].rt
                        t_step2_keyresp.duration = _t_step2_keyresp_allKeys[0].duration
                # Run 'Each Frame' code from t_step2_code
                if len(t_step2_keyresp.keys) > 0:
                    t_step2_highlight_flag = True
                
                # *t_step2_stim_img* updates
                
                # if t_step2_stim_img is starting this frame...
                if t_step2_stim_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_step2_stim_img.frameNStart = frameN  # exact frame index
                    t_step2_stim_img.tStart = t  # local t and not account for scr refresh
                    t_step2_stim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_step2_stim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_step2_stim_img.status = STARTED
                    t_step2_stim_img.setAutoDraw(True)
                
                # if t_step2_stim_img is active this frame...
                if t_step2_stim_img.status == STARTED:
                    # update params
                    pass
                
                # if t_step2_stim_img is stopping this frame...
                if t_step2_stim_img.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > t_step2_stim_img.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        t_step2_stim_img.tStop = t  # not accounting for scr refresh
                        t_step2_stim_img.frameNStop = frameN  # exact frame index
                        # update status
                        t_step2_stim_img.status = FINISHED
                        t_step2_stim_img.setAutoDraw(False)
                
                # *t_step2_highlight_img* updates
                
                # if t_step2_highlight_img is starting this frame...
                if t_step2_highlight_img.status == NOT_STARTED and t_step2_highlight_flag:
                    # keep track of start time/frame for later
                    t_step2_highlight_img.frameNStart = frameN  # exact frame index
                    t_step2_highlight_img.tStart = t  # local t and not account for scr refresh
                    t_step2_highlight_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_step2_highlight_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_step2_highlight_img.status = STARTED
                    t_step2_highlight_img.setAutoDraw(True)
                
                # if t_step2_highlight_img is active this frame...
                if t_step2_highlight_img.status == STARTED:
                    # update params
                    t_step2_highlight_img.setPos((0, .05), log=False)
                
                # *t_step2_scoreBg_img* updates
                
                # if t_step2_scoreBg_img is starting this frame...
                if t_step2_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_step2_scoreBg_img.frameNStart = frameN  # exact frame index
                    t_step2_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    t_step2_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_step2_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_step2_scoreBg_img.status = STARTED
                    t_step2_scoreBg_img.setAutoDraw(True)
                
                # if t_step2_scoreBg_img is active this frame...
                if t_step2_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_step2_score_txt* updates
                
                # if t_step2_score_txt is starting this frame...
                if t_step2_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_step2_score_txt.frameNStart = frameN  # exact frame index
                    t_step2_score_txt.tStart = t  # local t and not account for scr refresh
                    t_step2_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_step2_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_step2_score_txt.status = STARTED
                    t_step2_score_txt.setAutoDraw(True)
                
                # if t_step2_score_txt is active this frame...
                if t_step2_score_txt.status == STARTED:
                    # update params
                    pass
                
                # if t_step2_score_txt is stopping this frame...
                if t_step2_score_txt.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > t_step2_score_txt.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        t_step2_score_txt.tStop = t  # not accounting for scr refresh
                        t_step2_score_txt.frameNStop = frameN  # exact frame index
                        # update status
                        t_step2_score_txt.status = FINISHED
                        t_step2_score_txt.setAutoDraw(False)
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in t_step2Components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "t_step2" ---
            for thisComponent in t_step2Components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # check responses
            if t_step2_keyresp.keys in ['', [], None]:  # No response was made
                t_step2_keyresp.keys = None
            t_step2_loop.addData('t_step2_keyresp.keys',t_step2_keyresp.keys)
            if t_step2_keyresp.keys != None:  # we had a response
                t_step2_loop.addData('t_step2_keyresp.rt', t_step2_keyresp.rt)
                t_step2_loop.addData('t_step2_keyresp.duration', t_step2_keyresp.duration)
            # Run 'End Routine' code from t_step2_code
            if t_step2_keyresp.keys=="space":
                t_reward_flag = 1
            else:
                t_failStep2_flag = 1
                t_points = 0
            # the Routine "t_step2" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed t_step2_flag repeats of 't_step2_loop'
        
        
        # set up handler to look after randomisation of conditions etc
        t_reward_loop = data.TrialHandler(nReps=t_reward_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='t_reward_loop')
        thisExp.addLoop(t_reward_loop)  # add the loop to the experiment
        thisT_reward_loop = t_reward_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisT_reward_loop.rgb)
        if thisT_reward_loop != None:
            for paramName in thisT_reward_loop:
                globals()[paramName] = thisT_reward_loop[paramName]
        
        for thisT_reward_loop in t_reward_loop:
            currentLoop = t_reward_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisT_reward_loop.rgb)
            if thisT_reward_loop != None:
                for paramName in thisT_reward_loop:
                    globals()[paramName] = thisT_reward_loop[paramName]
            
            # --- Prepare to start Routine "t_reward" ---
            continueRoutine = True
            # update component parameters for each repeat
            t_reward_bg_img.setImage(t_step2_stim_var["file"])
            t_reward_step2Stim_img.setImage(t_step2_stim_var["basket_file"])
            t_reward_rewardAmount_txt.setText(t_reward_trialPoints_txt)
            # Run 'Begin Routine' code from t_reward_updateScore_code
            global_score = global_score + t_points
            t_reward_mushroom_var = "ressources/mush" + str(t_points) + ".jpg"
            t_reward_score_txt.setText("SCORE: " + str(global_score))
            t_reward_mushroom_img.setImage(t_reward_mushroom_var)
            # keep track of which components have finished
            t_rewardComponents = [t_reward_bg_img, t_reward_step2Stim_img, t_reward_step2Highlight_img, t_reward_scoreBg_img, t_reward_rewardAmount_txt, t_reward_score_txt, t_reward_mushroom_img]
            for thisComponent in t_rewardComponents:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "t_reward" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 2-frameTolerance:
                    continueRoutine = False
                
                # *t_reward_bg_img* updates
                
                # if t_reward_bg_img is starting this frame...
                if t_reward_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_bg_img.frameNStart = frameN  # exact frame index
                    t_reward_bg_img.tStart = t  # local t and not account for scr refresh
                    t_reward_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_bg_img.status = STARTED
                    t_reward_bg_img.setAutoDraw(True)
                
                # if t_reward_bg_img is active this frame...
                if t_reward_bg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_reward_step2Stim_img* updates
                
                # if t_reward_step2Stim_img is starting this frame...
                if t_reward_step2Stim_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_step2Stim_img.frameNStart = frameN  # exact frame index
                    t_reward_step2Stim_img.tStart = t  # local t and not account for scr refresh
                    t_reward_step2Stim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_step2Stim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_step2Stim_img.status = STARTED
                    t_reward_step2Stim_img.setAutoDraw(True)
                
                # if t_reward_step2Stim_img is active this frame...
                if t_reward_step2Stim_img.status == STARTED:
                    # update params
                    pass
                
                # if t_reward_step2Stim_img is stopping this frame...
                if t_reward_step2Stim_img.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > t_reward_step2Stim_img.tStartRefresh + 2-frameTolerance:
                        # keep track of stop time/frame for later
                        t_reward_step2Stim_img.tStop = t  # not accounting for scr refresh
                        t_reward_step2Stim_img.frameNStop = frameN  # exact frame index
                        # update status
                        t_reward_step2Stim_img.status = FINISHED
                        t_reward_step2Stim_img.setAutoDraw(False)
                
                # *t_reward_step2Highlight_img* updates
                
                # if t_reward_step2Highlight_img is starting this frame...
                if t_reward_step2Highlight_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_step2Highlight_img.frameNStart = frameN  # exact frame index
                    t_reward_step2Highlight_img.tStart = t  # local t and not account for scr refresh
                    t_reward_step2Highlight_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_step2Highlight_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_step2Highlight_img.status = STARTED
                    t_reward_step2Highlight_img.setAutoDraw(True)
                
                # if t_reward_step2Highlight_img is active this frame...
                if t_reward_step2Highlight_img.status == STARTED:
                    # update params
                    t_reward_step2Highlight_img.setPos((0, .05), log=False)
                
                # *t_reward_scoreBg_img* updates
                
                # if t_reward_scoreBg_img is starting this frame...
                if t_reward_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_scoreBg_img.frameNStart = frameN  # exact frame index
                    t_reward_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    t_reward_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_scoreBg_img.status = STARTED
                    t_reward_scoreBg_img.setAutoDraw(True)
                
                # if t_reward_scoreBg_img is active this frame...
                if t_reward_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_reward_rewardAmount_txt* updates
                
                # if t_reward_rewardAmount_txt is starting this frame...
                if t_reward_rewardAmount_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_rewardAmount_txt.frameNStart = frameN  # exact frame index
                    t_reward_rewardAmount_txt.tStart = t  # local t and not account for scr refresh
                    t_reward_rewardAmount_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_rewardAmount_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_rewardAmount_txt.status = STARTED
                    t_reward_rewardAmount_txt.setAutoDraw(True)
                
                # if t_reward_rewardAmount_txt is active this frame...
                if t_reward_rewardAmount_txt.status == STARTED:
                    # update params
                    pass
                
                # *t_reward_score_txt* updates
                
                # if t_reward_score_txt is starting this frame...
                if t_reward_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_score_txt.frameNStart = frameN  # exact frame index
                    t_reward_score_txt.tStart = t  # local t and not account for scr refresh
                    t_reward_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_score_txt.status = STARTED
                    t_reward_score_txt.setAutoDraw(True)
                
                # if t_reward_score_txt is active this frame...
                if t_reward_score_txt.status == STARTED:
                    # update params
                    pass
                
                # *t_reward_mushroom_img* updates
                
                # if t_reward_mushroom_img is starting this frame...
                if t_reward_mushroom_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_reward_mushroom_img.frameNStart = frameN  # exact frame index
                    t_reward_mushroom_img.tStart = t  # local t and not account for scr refresh
                    t_reward_mushroom_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_reward_mushroom_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_reward_mushroom_img.status = STARTED
                    t_reward_mushroom_img.setAutoDraw(True)
                
                # if t_reward_mushroom_img is active this frame...
                if t_reward_mushroom_img.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in t_rewardComponents:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "t_reward" ---
            for thisComponent in t_rewardComponents:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # the Routine "t_reward" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed t_reward_flag repeats of 't_reward_loop'
        
        
        # set up handler to look after randomisation of conditions etc
        t_failStep1_loop = data.TrialHandler(nReps=t_failStep1_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='t_failStep1_loop')
        thisExp.addLoop(t_failStep1_loop)  # add the loop to the experiment
        thisT_failStep1_loop = t_failStep1_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisT_failStep1_loop.rgb)
        if thisT_failStep1_loop != None:
            for paramName in thisT_failStep1_loop:
                globals()[paramName] = thisT_failStep1_loop[paramName]
        
        for thisT_failStep1_loop in t_failStep1_loop:
            currentLoop = t_failStep1_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisT_failStep1_loop.rgb)
            if thisT_failStep1_loop != None:
                for paramName in thisT_failStep1_loop:
                    globals()[paramName] = thisT_failStep1_loop[paramName]
            
            # --- Prepare to start Routine "t_failStep1" ---
            continueRoutine = True
            # update component parameters for each repeat
            t_failStep1_leftStim_img.setImage(t_step1_stimLeft_var["deact_file"])
            t_failStep1_rightStim_img.setImage(t_step1_stimRight_var["deact_file"])
            t_fail_score_txt.setText("SCORE: " + str(global_score))
            # keep track of which components have finished
            t_failStep1Components = [t_failStep1_bg_img, t_failStep1_leftStim_img, t_failStep1_rightStim_img, t_failStep1_scoreBg_img, t_fail_score_txt]
            for thisComponent in t_failStep1Components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "t_failStep1" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 1-frameTolerance:
                    continueRoutine = False
                
                # *t_failStep1_bg_img* updates
                
                # if t_failStep1_bg_img is starting this frame...
                if t_failStep1_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep1_bg_img.frameNStart = frameN  # exact frame index
                    t_failStep1_bg_img.tStart = t  # local t and not account for scr refresh
                    t_failStep1_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep1_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep1_bg_img.status = STARTED
                    t_failStep1_bg_img.setAutoDraw(True)
                
                # if t_failStep1_bg_img is active this frame...
                if t_failStep1_bg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_failStep1_leftStim_img* updates
                
                # if t_failStep1_leftStim_img is starting this frame...
                if t_failStep1_leftStim_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep1_leftStim_img.frameNStart = frameN  # exact frame index
                    t_failStep1_leftStim_img.tStart = t  # local t and not account for scr refresh
                    t_failStep1_leftStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep1_leftStim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep1_leftStim_img.status = STARTED
                    t_failStep1_leftStim_img.setAutoDraw(True)
                
                # if t_failStep1_leftStim_img is active this frame...
                if t_failStep1_leftStim_img.status == STARTED:
                    # update params
                    pass
                
                # *t_failStep1_rightStim_img* updates
                
                # if t_failStep1_rightStim_img is starting this frame...
                if t_failStep1_rightStim_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep1_rightStim_img.frameNStart = frameN  # exact frame index
                    t_failStep1_rightStim_img.tStart = t  # local t and not account for scr refresh
                    t_failStep1_rightStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep1_rightStim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep1_rightStim_img.status = STARTED
                    t_failStep1_rightStim_img.setAutoDraw(True)
                
                # if t_failStep1_rightStim_img is active this frame...
                if t_failStep1_rightStim_img.status == STARTED:
                    # update params
                    pass
                
                # *t_failStep1_scoreBg_img* updates
                
                # if t_failStep1_scoreBg_img is starting this frame...
                if t_failStep1_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep1_scoreBg_img.frameNStart = frameN  # exact frame index
                    t_failStep1_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    t_failStep1_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep1_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep1_scoreBg_img.status = STARTED
                    t_failStep1_scoreBg_img.setAutoDraw(True)
                
                # if t_failStep1_scoreBg_img is active this frame...
                if t_failStep1_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_fail_score_txt* updates
                
                # if t_fail_score_txt is starting this frame...
                if t_fail_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_fail_score_txt.frameNStart = frameN  # exact frame index
                    t_fail_score_txt.tStart = t  # local t and not account for scr refresh
                    t_fail_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_fail_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_fail_score_txt.status = STARTED
                    t_fail_score_txt.setAutoDraw(True)
                
                # if t_fail_score_txt is active this frame...
                if t_fail_score_txt.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in t_failStep1Components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "t_failStep1" ---
            for thisComponent in t_failStep1Components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # the Routine "t_failStep1" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed t_failStep1_flag repeats of 't_failStep1_loop'
        
        
        # set up handler to look after randomisation of conditions etc
        t_failStep2_loop = data.TrialHandler(nReps=t_failStep2_flag, method='random', 
            extraInfo=expInfo, originPath=-1,
            trialList=[None],
            seed=None, name='t_failStep2_loop')
        thisExp.addLoop(t_failStep2_loop)  # add the loop to the experiment
        thisT_failStep2_loop = t_failStep2_loop.trialList[0]  # so we can initialise stimuli with some values
        # abbreviate parameter names if possible (e.g. rgb = thisT_failStep2_loop.rgb)
        if thisT_failStep2_loop != None:
            for paramName in thisT_failStep2_loop:
                globals()[paramName] = thisT_failStep2_loop[paramName]
        
        for thisT_failStep2_loop in t_failStep2_loop:
            currentLoop = t_failStep2_loop
            thisExp.timestampOnFlip(win, 'thisRow.t')
            # pause experiment here if requested
            if thisExp.status == PAUSED:
                pauseExperiment(
                    thisExp=thisExp, 
                    inputs=inputs, 
                    win=win, 
                    timers=[routineTimer], 
                    playbackComponents=[]
            )
            # abbreviate parameter names if possible (e.g. rgb = thisT_failStep2_loop.rgb)
            if thisT_failStep2_loop != None:
                for paramName in thisT_failStep2_loop:
                    globals()[paramName] = thisT_failStep2_loop[paramName]
            
            # --- Prepare to start Routine "t_failStep2" ---
            continueRoutine = True
            # update component parameters for each repeat
            t_failStep2_bg_img.setImage(t_step2_stim_var["file"])
            t_failStep2_stim_img.setImage('ressources/fail_basket.jpg')
            t_failStep2_score_txt.setText("SCORE: " + str(global_score))
            # keep track of which components have finished
            t_failStep2Components = [t_failStep2_bg_img, t_failStep2_stim_img, t_failStep2_scoreBg_img, t_failStep2_score_txt]
            for thisComponent in t_failStep2Components:
                thisComponent.tStart = None
                thisComponent.tStop = None
                thisComponent.tStartRefresh = None
                thisComponent.tStopRefresh = None
                if hasattr(thisComponent, 'status'):
                    thisComponent.status = NOT_STARTED
            # reset timers
            t = 0
            _timeToFirstFrame = win.getFutureFlipTime(clock="now")
            frameN = -1
            
            # --- Run Routine "t_failStep2" ---
            routineForceEnded = not continueRoutine
            while continueRoutine:
                # get current time
                t = routineTimer.getTime()
                tThisFlip = win.getFutureFlipTime(clock=routineTimer)
                tThisFlipGlobal = win.getFutureFlipTime(clock=None)
                frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
                # update/draw components on each frame
                # is it time to end the Routine? (based on local clock)
                if tThisFlip > 1-frameTolerance:
                    continueRoutine = False
                
                # *t_failStep2_bg_img* updates
                
                # if t_failStep2_bg_img is starting this frame...
                if t_failStep2_bg_img.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep2_bg_img.frameNStart = frameN  # exact frame index
                    t_failStep2_bg_img.tStart = t  # local t and not account for scr refresh
                    t_failStep2_bg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep2_bg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep2_bg_img.status = STARTED
                    t_failStep2_bg_img.setAutoDraw(True)
                
                # if t_failStep2_bg_img is active this frame...
                if t_failStep2_bg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_failStep2_stim_img* updates
                
                # if t_failStep2_stim_img is starting this frame...
                if t_failStep2_stim_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep2_stim_img.frameNStart = frameN  # exact frame index
                    t_failStep2_stim_img.tStart = t  # local t and not account for scr refresh
                    t_failStep2_stim_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep2_stim_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep2_stim_img.status = STARTED
                    t_failStep2_stim_img.setAutoDraw(True)
                
                # if t_failStep2_stim_img is active this frame...
                if t_failStep2_stim_img.status == STARTED:
                    # update params
                    pass
                
                # if t_failStep2_stim_img is stopping this frame...
                if t_failStep2_stim_img.status == STARTED:
                    # is it time to stop? (based on global clock, using actual start)
                    if tThisFlipGlobal > t_failStep2_stim_img.tStartRefresh + 1.5-frameTolerance:
                        # keep track of stop time/frame for later
                        t_failStep2_stim_img.tStop = t  # not accounting for scr refresh
                        t_failStep2_stim_img.frameNStop = frameN  # exact frame index
                        # update status
                        t_failStep2_stim_img.status = FINISHED
                        t_failStep2_stim_img.setAutoDraw(False)
                
                # *t_failStep2_scoreBg_img* updates
                
                # if t_failStep2_scoreBg_img is starting this frame...
                if t_failStep2_scoreBg_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep2_scoreBg_img.frameNStart = frameN  # exact frame index
                    t_failStep2_scoreBg_img.tStart = t  # local t and not account for scr refresh
                    t_failStep2_scoreBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep2_scoreBg_img, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep2_scoreBg_img.status = STARTED
                    t_failStep2_scoreBg_img.setAutoDraw(True)
                
                # if t_failStep2_scoreBg_img is active this frame...
                if t_failStep2_scoreBg_img.status == STARTED:
                    # update params
                    pass
                
                # *t_failStep2_score_txt* updates
                
                # if t_failStep2_score_txt is starting this frame...
                if t_failStep2_score_txt.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
                    # keep track of start time/frame for later
                    t_failStep2_score_txt.frameNStart = frameN  # exact frame index
                    t_failStep2_score_txt.tStart = t  # local t and not account for scr refresh
                    t_failStep2_score_txt.tStartRefresh = tThisFlipGlobal  # on global time
                    win.timeOnFlip(t_failStep2_score_txt, 'tStartRefresh')  # time at next scr refresh
                    # update status
                    t_failStep2_score_txt.status = STARTED
                    t_failStep2_score_txt.setAutoDraw(True)
                
                # if t_failStep2_score_txt is active this frame...
                if t_failStep2_score_txt.status == STARTED:
                    # update params
                    pass
                
                # check for quit (typically the Esc key)
                if defaultKeyboard.getKeys(keyList=["escape"]):
                    thisExp.status = FINISHED
                if thisExp.status == FINISHED or endExpNow:
                    endExperiment(thisExp, inputs=inputs, win=win)
                    return
                
                # check if all components have finished
                if not continueRoutine:  # a component has requested a forced-end of Routine
                    routineForceEnded = True
                    break
                continueRoutine = False  # will revert to True if at least one component still running
                for thisComponent in t_failStep2Components:
                    if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                        continueRoutine = True
                        break  # at least one component has not yet finished
                
                # refresh the screen
                if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                    win.flip()
            
            # --- Ending Routine "t_failStep2" ---
            for thisComponent in t_failStep2Components:
                if hasattr(thisComponent, "setAutoDraw"):
                    thisComponent.setAutoDraw(False)
            # the Routine "t_failStep2" was not non-slip safe, so reset the non-slip timer
            routineTimer.reset()
        # completed t_failStep2_flag repeats of 't_failStep2_loop'
        
        
        # --- Prepare to start Routine "t_data" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from t_data_code
        thisExp.addData("t_step1_pair_index", pair_index)
        thisExp.addData("t_step1_stimLeft_name", t_step1_stimLeft_var["name"])
        thisExp.addData("t_step1_stimLeft_pair", t_step1_stimLeft_var["pair"])
        thisExp.addData("t_step1_stimLeft_reward", t_step1_stimLeft_var["reward"])
        thisExp.addData("t_step1_stimLeft_step2Stim", t_step1_stimLeft_var["step2"]["name"])
        thisExp.addData("t_step1_stimLeft_step2Basket", t_step1_stimLeft_var["step2"]["basket_name"])
        thisExp.addData("t_step1_stimRight_name", t_step1_stimRight_var["name"])
        thisExp.addData("t_step1_stimRight_pair", t_step1_stimRight_var["pair"])
        thisExp.addData("t_step1_stimRight_reward", t_step1_stimRight_var["reward"])
        thisExp.addData("t_step1_stimRight_step2Stim", t_step1_stimRight_var["step2"]["name"])
        thisExp.addData("t_step1_stimRight_step2Basket", t_step1_stimRight_var["step2"]["basket_name"])
        thisExp.addData("t_points", t_points)
        thisExp.addData("t_fail_step1", t_failStep1_flag)
        thisExp.addData("t_fail_step2", t_failStep2_flag)
        thisExp.addData("t_reward_flag", t_reward_flag)
        thisExp.addData("t_step1_choice", t_step1_choice["name"])
        thisExp.addData("t_step2_stim", t_step2_stim_var["name"])
        thisExp.addData("t_step2_basket", t_step2_stim_var["basket_name"])
        thisExp.addData("globa_score", global_score)
        # keep track of which components have finished
        t_dataComponents = []
        for thisComponent in t_dataComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "t_data" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in t_dataComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "t_data" ---
        for thisComponent in t_dataComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # Run 'End Routine' code from t_data_code
        t_data_stimWalk0 = round(random.choice(global_gaussian_dist))
        t_data_stimWalk1 = round(random.choice(global_gaussian_dist))
        
        for i in range(len(l_t_step1_stims)):
            stim = l_t_step1_stims[i]
            if stim["pair"] == 0:
                stim["reward"] += t_data_stimWalk0
            else:
                stim["reward"] += t_data_stimWalk1
            if stim["reward"] < 0:
                stim["reward"] = 0
            if stim["reward"] > 9:
                stim["reward"] = 9
        
        
        thisExp.addData("t_data_stimWalk0", t_data_stimWalk0)
        thisExp.addData("t_data_stimWalk1", t_data_stimWalk1)
        # the Routine "t_data" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 50.0 repeats of 'trials'
    
    
    # --- Prepare to start Routine "verbal_transmission" ---
    continueRoutine = True
    # update component parameters for each repeat
    vb_textbox.reset()
    # reset vb_finished_typing to account for continued clicks & clear times on/off
    vb_finished_typing.reset()
    # Run 'Begin Routine' code from vb_code
    chr_counter = "Character counter\n "+ str(len(vb_textbox.text)) + " / 2000"
    
    # keep track of which components have finished
    verbal_transmissionComponents = [vb_textbox, vb_finished_typing, vb_text]
    for thisComponent in verbal_transmissionComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "verbal_transmission" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *vb_textbox* updates
        
        # if vb_textbox is starting this frame...
        if vb_textbox.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            vb_textbox.frameNStart = frameN  # exact frame index
            vb_textbox.tStart = t  # local t and not account for scr refresh
            vb_textbox.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(vb_textbox, 'tStartRefresh')  # time at next scr refresh
            # update status
            vb_textbox.status = STARTED
            vb_textbox.setAutoDraw(True)
        
        # if vb_textbox is active this frame...
        if vb_textbox.status == STARTED:
            # update params
            pass
        # *vb_finished_typing* updates
        
        # if vb_finished_typing is starting this frame...
        if vb_finished_typing.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            vb_finished_typing.frameNStart = frameN  # exact frame index
            vb_finished_typing.tStart = t  # local t and not account for scr refresh
            vb_finished_typing.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(vb_finished_typing, 'tStartRefresh')  # time at next scr refresh
            # update status
            vb_finished_typing.status = STARTED
            vb_finished_typing.setAutoDraw(True)
        
        # if vb_finished_typing is active this frame...
        if vb_finished_typing.status == STARTED:
            # update params
            pass
            # check whether vb_finished_typing has been pressed
            if vb_finished_typing.isClicked:
                if not vb_finished_typing.wasClicked:
                    # if this is a new click, store time of first click and clicked until
                    vb_finished_typing.timesOn.append(vb_finished_typing.buttonClock.getTime())
                    vb_finished_typing.timesOff.append(vb_finished_typing.buttonClock.getTime())
                elif len(vb_finished_typing.timesOff):
                    # if click is continuing from last frame, update time of clicked until
                    vb_finished_typing.timesOff[-1] = vb_finished_typing.buttonClock.getTime()
                if not vb_finished_typing.wasClicked:
                    # end routine when vb_finished_typing is clicked
                    continueRoutine = False
                if not vb_finished_typing.wasClicked:
                    # run callback code when vb_finished_typing is clicked
                    pass
        # take note of whether vb_finished_typing was clicked, so that next frame we know if clicks are new
        vb_finished_typing.wasClicked = vb_finished_typing.isClicked and vb_finished_typing.status == STARTED
        
        # *vb_text* updates
        
        # if vb_text is starting this frame...
        if vb_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            vb_text.frameNStart = frameN  # exact frame index
            vb_text.tStart = t  # local t and not account for scr refresh
            vb_text.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(vb_text, 'tStartRefresh')  # time at next scr refresh
            # update status
            vb_text.status = STARTED
            vb_text.setAutoDraw(True)
        
        # if vb_text is active this frame...
        if vb_text.status == STARTED:
            # update params
            vb_text.setText(chr_counter, log=False)
        # Run 'Each Frame' code from vb_code
        if len(vb_textbox.text) >= 1:
            chr_counter = "Character counter\n "+ str(len(vb_textbox.text)) + " / 2000"
        
        if len(vb_textbox.text) > 2000:
            vb_textbox.text = vb_textbox.text[:2001]
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in verbal_transmissionComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "verbal_transmission" ---
    for thisComponent in verbal_transmissionComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    thisExp.addData('vb_textbox.text',vb_textbox.text)
    # the Routine "verbal_transmission" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "pl_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    pl_instructions_keyresp.keys = []
    pl_instructions_keyresp.rt = []
    _pl_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    pl_instructionsComponents = [pl_instructions_keyresp, pl_instructions_txt]
    for thisComponent in pl_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "pl_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *pl_instructions_keyresp* updates
        
        # if pl_instructions_keyresp is starting this frame...
        if pl_instructions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl_instructions_keyresp.frameNStart = frameN  # exact frame index
            pl_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            pl_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            pl_instructions_keyresp.clock.reset()  # now t=0
            pl_instructions_keyresp.clearEvents(eventType='keyboard')
        if pl_instructions_keyresp.status == STARTED:
            theseKeys = pl_instructions_keyresp.getKeys(keyList=['y','n','left','right','space'], ignoreKeys=["escape"], waitRelease=False)
            _pl_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_pl_instructions_keyresp_allKeys):
                pl_instructions_keyresp.keys = _pl_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                pl_instructions_keyresp.rt = _pl_instructions_keyresp_allKeys[-1].rt
                pl_instructions_keyresp.duration = _pl_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *pl_instructions_txt* updates
        
        # if pl_instructions_txt is starting this frame...
        if pl_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl_instructions_txt.frameNStart = frameN  # exact frame index
            pl_instructions_txt.tStart = t  # local t and not account for scr refresh
            pl_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl_instructions_txt.status = STARTED
            pl_instructions_txt.setAutoDraw(True)
        
        # if pl_instructions_txt is active this frame...
        if pl_instructions_txt.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pl_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "pl_instructions" ---
    for thisComponent in pl_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if pl_instructions_keyresp.keys in ['', [], None]:  # No response was made
        pl_instructions_keyresp.keys = None
    thisExp.addData('pl_instructions_keyresp.keys',pl_instructions_keyresp.keys)
    if pl_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('pl_instructions_keyresp.rt', pl_instructions_keyresp.rt)
        thisExp.addData('pl_instructions_keyresp.duration', pl_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "pl_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "pl1_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    pl1_instructions_keyresp.keys = []
    pl1_instructions_keyresp.rt = []
    _pl1_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    pl1_instructionsComponents = [pl1_instructions_keyresp, pl1_instructions_txt]
    for thisComponent in pl1_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "pl1_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *pl1_instructions_keyresp* updates
        
        # if pl1_instructions_keyresp is starting this frame...
        if pl1_instructions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl1_instructions_keyresp.frameNStart = frameN  # exact frame index
            pl1_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            pl1_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl1_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl1_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            pl1_instructions_keyresp.clock.reset()  # now t=0
            pl1_instructions_keyresp.clearEvents(eventType='keyboard')
        if pl1_instructions_keyresp.status == STARTED:
            theseKeys = pl1_instructions_keyresp.getKeys(keyList=['y','n','left','right','space'], ignoreKeys=["escape"], waitRelease=False)
            _pl1_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_pl1_instructions_keyresp_allKeys):
                pl1_instructions_keyresp.keys = _pl1_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                pl1_instructions_keyresp.rt = _pl1_instructions_keyresp_allKeys[-1].rt
                pl1_instructions_keyresp.duration = _pl1_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *pl1_instructions_txt* updates
        
        # if pl1_instructions_txt is starting this frame...
        if pl1_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl1_instructions_txt.frameNStart = frameN  # exact frame index
            pl1_instructions_txt.tStart = t  # local t and not account for scr refresh
            pl1_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl1_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl1_instructions_txt.status = STARTED
            pl1_instructions_txt.setAutoDraw(True)
        
        # if pl1_instructions_txt is active this frame...
        if pl1_instructions_txt.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pl1_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "pl1_instructions" ---
    for thisComponent in pl1_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if pl1_instructions_keyresp.keys in ['', [], None]:  # No response was made
        pl1_instructions_keyresp.keys = None
    thisExp.addData('pl1_instructions_keyresp.keys',pl1_instructions_keyresp.keys)
    if pl1_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('pl1_instructions_keyresp.rt', pl1_instructions_keyresp.rt)
        thisExp.addData('pl1_instructions_keyresp.duration', pl1_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "pl1_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    pl1_loop = data.TrialHandler(nReps=4.0, method='fullRandom', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='pl1_loop')
    thisExp.addLoop(pl1_loop)  # add the loop to the experiment
    thisPl1_loop = pl1_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisPl1_loop.rgb)
    if thisPl1_loop != None:
        for paramName in thisPl1_loop:
            globals()[paramName] = thisPl1_loop[paramName]
    
    for thisPl1_loop in pl1_loop:
        currentLoop = pl1_loop
        thisExp.timestampOnFlip(win, 'thisRow.t')
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                inputs=inputs, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisPl1_loop.rgb)
        if thisPl1_loop != None:
            for paramName in thisPl1_loop:
                globals()[paramName] = thisPl1_loop[paramName]
        
        # --- Prepare to start Routine "pl1_setup" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl1_setup_code
        pl1_task_step1Stim_var = l_t_step1_stims[pl1_index]
        # keep track of which components have finished
        pl1_setupComponents = []
        for thisComponent in pl1_setupComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl1_setup" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl1_setupComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl1_setup" ---
        for thisComponent in pl1_setupComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl1_setup" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl1_task" ---
        continueRoutine = True
        # update component parameters for each repeat
        pl1_task_stim_img.setImage(pl1_task_step1Stim_var["file"])
        pl1_task_lickert.reset()
        pl1_task_step2LeftStimBg_img.setImage(pl1_task_step2LeftStim_var["file"])
        pl1_task_step2RightStimBg_img.setImage(pl1_task_step2RightStim_var["file"])
        pl1_task_step2LeftStim_img.setImage(pl1_task_step2LeftStim_var["basket_file"])
        pl1_task_step2RightStim_img.setImage(pl1_task_step2RightStim_var["basket_file"])
        pl1_task_keyresp.keys = []
        pl1_task_keyresp.rt = []
        _pl1_task_keyresp_allKeys = []
        # keep track of which components have finished
        pl1_taskComponents = [pl1_task_stim_img, pl1_task_lickert, pl1_task_step2LeftStimBg_img, pl1_task_step2RightStimBg_img, pl1_task_step2LeftStim_img, pl1_task_step2RightStim_img, pl1_task_keyresp, pl1_task_fixation_txt]
        for thisComponent in pl1_taskComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl1_task" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *pl1_task_stim_img* updates
            
            # if pl1_task_stim_img is starting this frame...
            if pl1_task_stim_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_stim_img.frameNStart = frameN  # exact frame index
                pl1_task_stim_img.tStart = t  # local t and not account for scr refresh
                pl1_task_stim_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_stim_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_stim_img.status = STARTED
                pl1_task_stim_img.setAutoDraw(True)
            
            # if pl1_task_stim_img is active this frame...
            if pl1_task_stim_img.status == STARTED:
                # update params
                pass
            
            # *pl1_task_lickert* updates
            
            # if pl1_task_lickert is starting this frame...
            if pl1_task_lickert.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_lickert.frameNStart = frameN  # exact frame index
                pl1_task_lickert.tStart = t  # local t and not account for scr refresh
                pl1_task_lickert.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_lickert, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_lickert.status = STARTED
                pl1_task_lickert.setAutoDraw(True)
            
            # if pl1_task_lickert is active this frame...
            if pl1_task_lickert.status == STARTED:
                # update params
                pass
            
            # *pl1_task_step2LeftStimBg_img* updates
            
            # if pl1_task_step2LeftStimBg_img is starting this frame...
            if pl1_task_step2LeftStimBg_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_step2LeftStimBg_img.frameNStart = frameN  # exact frame index
                pl1_task_step2LeftStimBg_img.tStart = t  # local t and not account for scr refresh
                pl1_task_step2LeftStimBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_step2LeftStimBg_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_step2LeftStimBg_img.status = STARTED
                pl1_task_step2LeftStimBg_img.setAutoDraw(True)
            
            # if pl1_task_step2LeftStimBg_img is active this frame...
            if pl1_task_step2LeftStimBg_img.status == STARTED:
                # update params
                pass
            
            # *pl1_task_step2RightStimBg_img* updates
            
            # if pl1_task_step2RightStimBg_img is starting this frame...
            if pl1_task_step2RightStimBg_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_step2RightStimBg_img.frameNStart = frameN  # exact frame index
                pl1_task_step2RightStimBg_img.tStart = t  # local t and not account for scr refresh
                pl1_task_step2RightStimBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_step2RightStimBg_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_step2RightStimBg_img.status = STARTED
                pl1_task_step2RightStimBg_img.setAutoDraw(True)
            
            # if pl1_task_step2RightStimBg_img is active this frame...
            if pl1_task_step2RightStimBg_img.status == STARTED:
                # update params
                pass
            
            # *pl1_task_step2LeftStim_img* updates
            
            # if pl1_task_step2LeftStim_img is starting this frame...
            if pl1_task_step2LeftStim_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_step2LeftStim_img.frameNStart = frameN  # exact frame index
                pl1_task_step2LeftStim_img.tStart = t  # local t and not account for scr refresh
                pl1_task_step2LeftStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_step2LeftStim_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_step2LeftStim_img.status = STARTED
                pl1_task_step2LeftStim_img.setAutoDraw(True)
            
            # if pl1_task_step2LeftStim_img is active this frame...
            if pl1_task_step2LeftStim_img.status == STARTED:
                # update params
                pass
            
            # *pl1_task_step2RightStim_img* updates
            
            # if pl1_task_step2RightStim_img is starting this frame...
            if pl1_task_step2RightStim_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_step2RightStim_img.frameNStart = frameN  # exact frame index
                pl1_task_step2RightStim_img.tStart = t  # local t and not account for scr refresh
                pl1_task_step2RightStim_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_step2RightStim_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_step2RightStim_img.status = STARTED
                pl1_task_step2RightStim_img.setAutoDraw(True)
            
            # if pl1_task_step2RightStim_img is active this frame...
            if pl1_task_step2RightStim_img.status == STARTED:
                # update params
                pass
            
            # *pl1_task_keyresp* updates
            
            # if pl1_task_keyresp is starting this frame...
            if pl1_task_keyresp.status == NOT_STARTED and t >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_keyresp.frameNStart = frameN  # exact frame index
                pl1_task_keyresp.tStart = t  # local t and not account for scr refresh
                pl1_task_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_keyresp, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_keyresp.status = STARTED
                # keyboard checking is just starting
                pl1_task_keyresp.clock.reset()  # now t=0
                pl1_task_keyresp.clearEvents(eventType='keyboard')
            if pl1_task_keyresp.status == STARTED:
                theseKeys = pl1_task_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                _pl1_task_keyresp_allKeys.extend(theseKeys)
                if len(_pl1_task_keyresp_allKeys):
                    pl1_task_keyresp.keys = _pl1_task_keyresp_allKeys[-1].name  # just the last key pressed
                    pl1_task_keyresp.rt = _pl1_task_keyresp_allKeys[-1].rt
                    pl1_task_keyresp.duration = _pl1_task_keyresp_allKeys[-1].duration
                    # a response ends the routine
                    continueRoutine = False
            
            # *pl1_task_fixation_txt* updates
            
            # if pl1_task_fixation_txt is starting this frame...
            if pl1_task_fixation_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                pl1_task_fixation_txt.frameNStart = frameN  # exact frame index
                pl1_task_fixation_txt.tStart = t  # local t and not account for scr refresh
                pl1_task_fixation_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl1_task_fixation_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl1_task_fixation_txt.status = STARTED
                pl1_task_fixation_txt.setAutoDraw(True)
            
            # if pl1_task_fixation_txt is active this frame...
            if pl1_task_fixation_txt.status == STARTED:
                # update params
                pass
            
            # if pl1_task_fixation_txt is stopping this frame...
            if pl1_task_fixation_txt.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > pl1_task_fixation_txt.tStartRefresh + 0.5-frameTolerance:
                    # keep track of stop time/frame for later
                    pl1_task_fixation_txt.tStop = t  # not accounting for scr refresh
                    pl1_task_fixation_txt.frameNStop = frameN  # exact frame index
                    # update status
                    pl1_task_fixation_txt.status = FINISHED
                    pl1_task_fixation_txt.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl1_taskComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl1_task" ---
        for thisComponent in pl1_taskComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        pl1_loop.addData('pl1_task_lickert.response', pl1_task_lickert.getRating())
        pl1_loop.addData('pl1_task_lickert.rt', pl1_task_lickert.getRT())
        # check responses
        if pl1_task_keyresp.keys in ['', [], None]:  # No response was made
            pl1_task_keyresp.keys = None
        pl1_loop.addData('pl1_task_keyresp.keys',pl1_task_keyresp.keys)
        if pl1_task_keyresp.keys != None:  # we had a response
            pl1_loop.addData('pl1_task_keyresp.rt', pl1_task_keyresp.rt)
            pl1_loop.addData('pl1_task_keyresp.duration', pl1_task_keyresp.duration)
        # the Routine "pl1_task" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl1_data" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl1_data_code
        pl1_index += 1
        
        thisExp.addData("pl1_task_stimUp", pl1_task_step1Stim_var["name"])
        thisExp.addData("pl1_task_stimLeftBg", pl1_task_step2LeftStim_var["name"])
        thisExp.addData("pl1_task_stimRightBg", pl1_task_step2RightStim_var["name"])
        thisExp.addData("pl1_task_stimLeft", pl1_task_step2LeftStim_var["basket_name"])
        thisExp.addData("pl1_task_stimRight", pl1_task_step2RightStim_var["basket_name"])
        # keep track of which components have finished
        pl1_dataComponents = []
        for thisComponent in pl1_dataComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl1_data" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl1_dataComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl1_data" ---
        for thisComponent in pl1_dataComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl1_data" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 4.0 repeats of 'pl1_loop'
    
    
    # --- Prepare to start Routine "pl2_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    pl2_instructions_keyresp.keys = []
    pl2_instructions_keyresp.rt = []
    _pl2_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    pl2_instructionsComponents = [pl2_instructions_keyresp, pl2_instructions_txt]
    for thisComponent in pl2_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "pl2_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *pl2_instructions_keyresp* updates
        
        # if pl2_instructions_keyresp is starting this frame...
        if pl2_instructions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl2_instructions_keyresp.frameNStart = frameN  # exact frame index
            pl2_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            pl2_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl2_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl2_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            pl2_instructions_keyresp.clock.reset()  # now t=0
            pl2_instructions_keyresp.clearEvents(eventType='keyboard')
        if pl2_instructions_keyresp.status == STARTED:
            theseKeys = pl2_instructions_keyresp.getKeys(keyList=['y','n','left','right','space'], ignoreKeys=["escape"], waitRelease=False)
            _pl2_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_pl2_instructions_keyresp_allKeys):
                pl2_instructions_keyresp.keys = _pl2_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                pl2_instructions_keyresp.rt = _pl2_instructions_keyresp_allKeys[-1].rt
                pl2_instructions_keyresp.duration = _pl2_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *pl2_instructions_txt* updates
        
        # if pl2_instructions_txt is starting this frame...
        if pl2_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl2_instructions_txt.frameNStart = frameN  # exact frame index
            pl2_instructions_txt.tStart = t  # local t and not account for scr refresh
            pl2_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl2_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl2_instructions_txt.status = STARTED
            pl2_instructions_txt.setAutoDraw(True)
        
        # if pl2_instructions_txt is active this frame...
        if pl2_instructions_txt.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pl2_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "pl2_instructions" ---
    for thisComponent in pl2_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if pl2_instructions_keyresp.keys in ['', [], None]:  # No response was made
        pl2_instructions_keyresp.keys = None
    thisExp.addData('pl2_instructions_keyresp.keys',pl2_instructions_keyresp.keys)
    if pl2_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('pl2_instructions_keyresp.rt', pl2_instructions_keyresp.rt)
        thisExp.addData('pl2_instructions_keyresp.duration', pl2_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "pl2_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    pl2_loop = data.TrialHandler(nReps=1.0, method='fullRandom', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('pl2.xlsx'),
        seed=None, name='pl2_loop')
    thisExp.addLoop(pl2_loop)  # add the loop to the experiment
    thisPl2_loop = pl2_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisPl2_loop.rgb)
    if thisPl2_loop != None:
        for paramName in thisPl2_loop:
            globals()[paramName] = thisPl2_loop[paramName]
    
    for thisPl2_loop in pl2_loop:
        currentLoop = pl2_loop
        thisExp.timestampOnFlip(win, 'thisRow.t')
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                inputs=inputs, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisPl2_loop.rgb)
        if thisPl2_loop != None:
            for paramName in thisPl2_loop:
                globals()[paramName] = thisPl2_loop[paramName]
        
        # --- Prepare to start Routine "pl2_setup" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl2_setup_code
        pl2_task_stimUp_var = l_t_step1_stims[stimUp_index]
        
        pl2_task_step2_index = [stimLeft_index, stimRight_index]
        random.shuffle(pl2_task_step2_index)
        
        pl2_task_stimLeft_var = l_t_step1_stims[pl2_task_step2_index[0]]
        pl2_task_stimRight_var = l_t_step1_stims[pl2_task_step2_index[1]]
        # keep track of which components have finished
        pl2_setupComponents = []
        for thisComponent in pl2_setupComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl2_setup" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl2_setupComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl2_setup" ---
        for thisComponent in pl2_setupComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl2_setup" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl2_task" ---
        continueRoutine = True
        # update component parameters for each repeat
        pl2_task_stimUp_img.setImage(pl2_task_stimUp_var["file"])
        pl2_task_lickert.reset()
        pl2_task_stimLeft_img.setImage(pl2_task_stimLeft_var["file"])
        pl2_task_stimRight_img.setImage(pl2_task_stimRight_var["file"])
        pl2_task_keyresp.keys = []
        pl2_task_keyresp.rt = []
        _pl2_task_keyresp_allKeys = []
        # keep track of which components have finished
        pl2_taskComponents = [pl2_task_stimUp_img, pl2_task_lickert, pl2_task_stimLeft_img, pl2_task_stimRight_img, pl2_task_keyresp, pl2_task_fixation_txt]
        for thisComponent in pl2_taskComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl2_task" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *pl2_task_stimUp_img* updates
            
            # if pl2_task_stimUp_img is starting this frame...
            if pl2_task_stimUp_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl2_task_stimUp_img.frameNStart = frameN  # exact frame index
                pl2_task_stimUp_img.tStart = t  # local t and not account for scr refresh
                pl2_task_stimUp_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl2_task_stimUp_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl2_task_stimUp_img.status = STARTED
                pl2_task_stimUp_img.setAutoDraw(True)
            
            # if pl2_task_stimUp_img is active this frame...
            if pl2_task_stimUp_img.status == STARTED:
                # update params
                pass
            
            # *pl2_task_lickert* updates
            
            # if pl2_task_lickert is starting this frame...
            if pl2_task_lickert.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl2_task_lickert.frameNStart = frameN  # exact frame index
                pl2_task_lickert.tStart = t  # local t and not account for scr refresh
                pl2_task_lickert.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl2_task_lickert, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl2_task_lickert.status = STARTED
                pl2_task_lickert.setAutoDraw(True)
            
            # if pl2_task_lickert is active this frame...
            if pl2_task_lickert.status == STARTED:
                # update params
                pass
            
            # *pl2_task_stimLeft_img* updates
            
            # if pl2_task_stimLeft_img is starting this frame...
            if pl2_task_stimLeft_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl2_task_stimLeft_img.frameNStart = frameN  # exact frame index
                pl2_task_stimLeft_img.tStart = t  # local t and not account for scr refresh
                pl2_task_stimLeft_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl2_task_stimLeft_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl2_task_stimLeft_img.status = STARTED
                pl2_task_stimLeft_img.setAutoDraw(True)
            
            # if pl2_task_stimLeft_img is active this frame...
            if pl2_task_stimLeft_img.status == STARTED:
                # update params
                pass
            
            # *pl2_task_stimRight_img* updates
            
            # if pl2_task_stimRight_img is starting this frame...
            if pl2_task_stimRight_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl2_task_stimRight_img.frameNStart = frameN  # exact frame index
                pl2_task_stimRight_img.tStart = t  # local t and not account for scr refresh
                pl2_task_stimRight_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl2_task_stimRight_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl2_task_stimRight_img.status = STARTED
                pl2_task_stimRight_img.setAutoDraw(True)
            
            # if pl2_task_stimRight_img is active this frame...
            if pl2_task_stimRight_img.status == STARTED:
                # update params
                pass
            
            # *pl2_task_keyresp* updates
            
            # if pl2_task_keyresp is starting this frame...
            if pl2_task_keyresp.status == NOT_STARTED and t >= 0.7-frameTolerance:
                # keep track of start time/frame for later
                pl2_task_keyresp.frameNStart = frameN  # exact frame index
                pl2_task_keyresp.tStart = t  # local t and not account for scr refresh
                pl2_task_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl2_task_keyresp, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl2_task_keyresp.status = STARTED
                # keyboard checking is just starting
                pl2_task_keyresp.clock.reset()  # now t=0
                pl2_task_keyresp.clearEvents(eventType='keyboard')
            if pl2_task_keyresp.status == STARTED:
                theseKeys = pl2_task_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                _pl2_task_keyresp_allKeys.extend(theseKeys)
                if len(_pl2_task_keyresp_allKeys):
                    pl2_task_keyresp.keys = _pl2_task_keyresp_allKeys[-1].name  # just the last key pressed
                    pl2_task_keyresp.rt = _pl2_task_keyresp_allKeys[-1].rt
                    pl2_task_keyresp.duration = _pl2_task_keyresp_allKeys[-1].duration
                    # a response ends the routine
                    continueRoutine = False
            
            # *pl2_task_fixation_txt* updates
            
            # if pl2_task_fixation_txt is starting this frame...
            if pl2_task_fixation_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                pl2_task_fixation_txt.frameNStart = frameN  # exact frame index
                pl2_task_fixation_txt.tStart = t  # local t and not account for scr refresh
                pl2_task_fixation_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl2_task_fixation_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl2_task_fixation_txt.status = STARTED
                pl2_task_fixation_txt.setAutoDraw(True)
            
            # if pl2_task_fixation_txt is active this frame...
            if pl2_task_fixation_txt.status == STARTED:
                # update params
                pass
            
            # if pl2_task_fixation_txt is stopping this frame...
            if pl2_task_fixation_txt.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > pl2_task_fixation_txt.tStartRefresh + 0.5-frameTolerance:
                    # keep track of stop time/frame for later
                    pl2_task_fixation_txt.tStop = t  # not accounting for scr refresh
                    pl2_task_fixation_txt.frameNStop = frameN  # exact frame index
                    # update status
                    pl2_task_fixation_txt.status = FINISHED
                    pl2_task_fixation_txt.setAutoDraw(False)
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl2_taskComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl2_task" ---
        for thisComponent in pl2_taskComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        pl2_loop.addData('pl2_task_lickert.response', pl2_task_lickert.getRating())
        pl2_loop.addData('pl2_task_lickert.rt', pl2_task_lickert.getRT())
        # check responses
        if pl2_task_keyresp.keys in ['', [], None]:  # No response was made
            pl2_task_keyresp.keys = None
        pl2_loop.addData('pl2_task_keyresp.keys',pl2_task_keyresp.keys)
        if pl2_task_keyresp.keys != None:  # we had a response
            pl2_loop.addData('pl2_task_keyresp.rt', pl2_task_keyresp.rt)
            pl2_loop.addData('pl2_task_keyresp.duration', pl2_task_keyresp.duration)
        # the Routine "pl2_task" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl2_data" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl2_data_code
        thisExp.addData("pl2_task_stimUp", pl2_task_stimUp_var["name"])
        thisExp.addData("pl2_task_stimLeft", pl2_task_stimLeft_var["name"])
        thisExp.addData("pl2_task_stimRight", pl2_task_stimRight_var["name"])
        
        # keep track of which components have finished
        pl2_dataComponents = []
        for thisComponent in pl2_dataComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl2_data" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl2_dataComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl2_data" ---
        for thisComponent in pl2_dataComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl2_data" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 1.0 repeats of 'pl2_loop'
    
    
    # --- Prepare to start Routine "pl3_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    pl3_instructions_keyresp.keys = []
    pl3_instructions_keyresp.rt = []
    _pl3_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    pl3_instructionsComponents = [pl3_instructions_keyresp, pl3_instructions_txt]
    for thisComponent in pl3_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "pl3_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *pl3_instructions_keyresp* updates
        
        # if pl3_instructions_keyresp is starting this frame...
        if pl3_instructions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl3_instructions_keyresp.frameNStart = frameN  # exact frame index
            pl3_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            pl3_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl3_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl3_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            pl3_instructions_keyresp.clock.reset()  # now t=0
            pl3_instructions_keyresp.clearEvents(eventType='keyboard')
        if pl3_instructions_keyresp.status == STARTED:
            theseKeys = pl3_instructions_keyresp.getKeys(keyList=['y','n','left','right','space'], ignoreKeys=["escape"], waitRelease=False)
            _pl3_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_pl3_instructions_keyresp_allKeys):
                pl3_instructions_keyresp.keys = _pl3_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                pl3_instructions_keyresp.rt = _pl3_instructions_keyresp_allKeys[-1].rt
                pl3_instructions_keyresp.duration = _pl3_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *pl3_instructions_txt* updates
        
        # if pl3_instructions_txt is starting this frame...
        if pl3_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl3_instructions_txt.frameNStart = frameN  # exact frame index
            pl3_instructions_txt.tStart = t  # local t and not account for scr refresh
            pl3_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl3_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl3_instructions_txt.status = STARTED
            pl3_instructions_txt.setAutoDraw(True)
        
        # if pl3_instructions_txt is active this frame...
        if pl3_instructions_txt.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pl3_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "pl3_instructions" ---
    for thisComponent in pl3_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if pl3_instructions_keyresp.keys in ['', [], None]:  # No response was made
        pl3_instructions_keyresp.keys = None
    thisExp.addData('pl3_instructions_keyresp.keys',pl3_instructions_keyresp.keys)
    if pl3_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('pl3_instructions_keyresp.rt', pl3_instructions_keyresp.rt)
        thisExp.addData('pl3_instructions_keyresp.duration', pl3_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "pl3_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    pl3_loop = data.TrialHandler(nReps=1.0, method='random', 
        extraInfo=expInfo, originPath=-1,
        trialList=[None],
        seed=None, name='pl3_loop')
    thisExp.addLoop(pl3_loop)  # add the loop to the experiment
    thisPl3_loop = pl3_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisPl3_loop.rgb)
    if thisPl3_loop != None:
        for paramName in thisPl3_loop:
            globals()[paramName] = thisPl3_loop[paramName]
    
    for thisPl3_loop in pl3_loop:
        currentLoop = pl3_loop
        thisExp.timestampOnFlip(win, 'thisRow.t')
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                inputs=inputs, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisPl3_loop.rgb)
        if thisPl3_loop != None:
            for paramName in thisPl3_loop:
                globals()[paramName] = thisPl3_loop[paramName]
        
        # --- Prepare to start Routine "pl3_setup" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl3_setup_code
        pl3_index = [0, 1]
        random.shuffle(pl3_index)
        
        pl3_task_stimLeft_var = l_t_step2_stims[pl3_index[0]]
        pl3_task_stimRight_var = l_t_step2_stims[pl3_index[1]]
        # keep track of which components have finished
        pl3_setupComponents = []
        for thisComponent in pl3_setupComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl3_setup" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl3_setupComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl3_setup" ---
        for thisComponent in pl3_setupComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl3_setup" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl3_task" ---
        continueRoutine = True
        # update component parameters for each repeat
        pl3_task_lickert.reset()
        pl3_task_keyresp.keys = []
        pl3_task_keyresp.rt = []
        _pl3_task_keyresp_allKeys = []
        pl3_task_stimLeftBg_img.setImage(pl3_task_stimLeft_var["file"])
        pl3_task_stimRightBg_img.setImage(pl3_task_stimRight_var["file"])
        pl3_task_stimLeft_img.setImage(pl3_task_stimLeft_var["basket_file"])
        pl3_task_stimRight_img.setImage(pl3_task_stimRight_var["basket_file"])
        # keep track of which components have finished
        pl3_taskComponents = [pl3_task_stimUp_txt, pl3_task_lickert, pl3_task_fixation_txt, pl3_task_keyresp, pl3_task_stimLeftBg_img, pl3_task_stimRightBg_img, pl3_task_stimLeft_img, pl3_task_stimRight_img]
        for thisComponent in pl3_taskComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl3_task" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *pl3_task_stimUp_txt* updates
            
            # if pl3_task_stimUp_txt is starting this frame...
            if pl3_task_stimUp_txt.status == NOT_STARTED and tThisFlip >= 0.7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_stimUp_txt.frameNStart = frameN  # exact frame index
                pl3_task_stimUp_txt.tStart = t  # local t and not account for scr refresh
                pl3_task_stimUp_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_stimUp_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_stimUp_txt.status = STARTED
                pl3_task_stimUp_txt.setAutoDraw(True)
            
            # if pl3_task_stimUp_txt is active this frame...
            if pl3_task_stimUp_txt.status == STARTED:
                # update params
                pass
            
            # *pl3_task_lickert* updates
            
            # if pl3_task_lickert is starting this frame...
            if pl3_task_lickert.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_lickert.frameNStart = frameN  # exact frame index
                pl3_task_lickert.tStart = t  # local t and not account for scr refresh
                pl3_task_lickert.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_lickert, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_lickert.status = STARTED
                pl3_task_lickert.setAutoDraw(True)
            
            # if pl3_task_lickert is active this frame...
            if pl3_task_lickert.status == STARTED:
                # update params
                pass
            
            # *pl3_task_fixation_txt* updates
            
            # if pl3_task_fixation_txt is starting this frame...
            if pl3_task_fixation_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_fixation_txt.frameNStart = frameN  # exact frame index
                pl3_task_fixation_txt.tStart = t  # local t and not account for scr refresh
                pl3_task_fixation_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_fixation_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_fixation_txt.status = STARTED
                pl3_task_fixation_txt.setAutoDraw(True)
            
            # if pl3_task_fixation_txt is active this frame...
            if pl3_task_fixation_txt.status == STARTED:
                # update params
                pass
            
            # if pl3_task_fixation_txt is stopping this frame...
            if pl3_task_fixation_txt.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > pl3_task_fixation_txt.tStartRefresh + 0.5-frameTolerance:
                    # keep track of stop time/frame for later
                    pl3_task_fixation_txt.tStop = t  # not accounting for scr refresh
                    pl3_task_fixation_txt.frameNStop = frameN  # exact frame index
                    # update status
                    pl3_task_fixation_txt.status = FINISHED
                    pl3_task_fixation_txt.setAutoDraw(False)
            
            # *pl3_task_keyresp* updates
            
            # if pl3_task_keyresp is starting this frame...
            if pl3_task_keyresp.status == NOT_STARTED and t >= 0.7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_keyresp.frameNStart = frameN  # exact frame index
                pl3_task_keyresp.tStart = t  # local t and not account for scr refresh
                pl3_task_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_keyresp, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_keyresp.status = STARTED
                # keyboard checking is just starting
                pl3_task_keyresp.clock.reset()  # now t=0
                pl3_task_keyresp.clearEvents(eventType='keyboard')
            if pl3_task_keyresp.status == STARTED:
                theseKeys = pl3_task_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                _pl3_task_keyresp_allKeys.extend(theseKeys)
                if len(_pl3_task_keyresp_allKeys):
                    pl3_task_keyresp.keys = _pl3_task_keyresp_allKeys[-1].name  # just the last key pressed
                    pl3_task_keyresp.rt = _pl3_task_keyresp_allKeys[-1].rt
                    pl3_task_keyresp.duration = _pl3_task_keyresp_allKeys[-1].duration
                    # a response ends the routine
                    continueRoutine = False
            
            # *pl3_task_stimLeftBg_img* updates
            
            # if pl3_task_stimLeftBg_img is starting this frame...
            if pl3_task_stimLeftBg_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_stimLeftBg_img.frameNStart = frameN  # exact frame index
                pl3_task_stimLeftBg_img.tStart = t  # local t and not account for scr refresh
                pl3_task_stimLeftBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_stimLeftBg_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_stimLeftBg_img.status = STARTED
                pl3_task_stimLeftBg_img.setAutoDraw(True)
            
            # if pl3_task_stimLeftBg_img is active this frame...
            if pl3_task_stimLeftBg_img.status == STARTED:
                # update params
                pass
            
            # *pl3_task_stimRightBg_img* updates
            
            # if pl3_task_stimRightBg_img is starting this frame...
            if pl3_task_stimRightBg_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_stimRightBg_img.frameNStart = frameN  # exact frame index
                pl3_task_stimRightBg_img.tStart = t  # local t and not account for scr refresh
                pl3_task_stimRightBg_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_stimRightBg_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_stimRightBg_img.status = STARTED
                pl3_task_stimRightBg_img.setAutoDraw(True)
            
            # if pl3_task_stimRightBg_img is active this frame...
            if pl3_task_stimRightBg_img.status == STARTED:
                # update params
                pass
            
            # *pl3_task_stimLeft_img* updates
            
            # if pl3_task_stimLeft_img is starting this frame...
            if pl3_task_stimLeft_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_stimLeft_img.frameNStart = frameN  # exact frame index
                pl3_task_stimLeft_img.tStart = t  # local t and not account for scr refresh
                pl3_task_stimLeft_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_stimLeft_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_stimLeft_img.status = STARTED
                pl3_task_stimLeft_img.setAutoDraw(True)
            
            # if pl3_task_stimLeft_img is active this frame...
            if pl3_task_stimLeft_img.status == STARTED:
                # update params
                pass
            
            # *pl3_task_stimRight_img* updates
            
            # if pl3_task_stimRight_img is starting this frame...
            if pl3_task_stimRight_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl3_task_stimRight_img.frameNStart = frameN  # exact frame index
                pl3_task_stimRight_img.tStart = t  # local t and not account for scr refresh
                pl3_task_stimRight_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl3_task_stimRight_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl3_task_stimRight_img.status = STARTED
                pl3_task_stimRight_img.setAutoDraw(True)
            
            # if pl3_task_stimRight_img is active this frame...
            if pl3_task_stimRight_img.status == STARTED:
                # update params
                pass
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl3_taskComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl3_task" ---
        for thisComponent in pl3_taskComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        pl3_loop.addData('pl3_task_lickert.response', pl3_task_lickert.getRating())
        pl3_loop.addData('pl3_task_lickert.rt', pl3_task_lickert.getRT())
        # check responses
        if pl3_task_keyresp.keys in ['', [], None]:  # No response was made
            pl3_task_keyresp.keys = None
        pl3_loop.addData('pl3_task_keyresp.keys',pl3_task_keyresp.keys)
        if pl3_task_keyresp.keys != None:  # we had a response
            pl3_loop.addData('pl3_task_keyresp.rt', pl3_task_keyresp.rt)
            pl3_loop.addData('pl3_task_keyresp.duration', pl3_task_keyresp.duration)
        # the Routine "pl3_task" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl3_data" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl3_data_code
        thisExp.addData("pl3_task_stimLeftBg", pl3_task_stimLeft_var["name"])
        thisExp.addData("pl3_task_stimRightBg", pl3_task_stimRight_var["name"])
        thisExp.addData("pl3_task_stimLeft", pl3_task_stimLeft_var["basket_name"])
        thisExp.addData("pl3_task_stimRight", pl3_task_stimRight_var["basket_name"])
        # keep track of which components have finished
        pl3_dataComponents = []
        for thisComponent in pl3_dataComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl3_data" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl3_dataComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl3_data" ---
        for thisComponent in pl3_dataComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl3_data" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 1.0 repeats of 'pl3_loop'
    
    
    # --- Prepare to start Routine "pl4_instructions" ---
    continueRoutine = True
    # update component parameters for each repeat
    pl4_instructions_keyresp.keys = []
    pl4_instructions_keyresp.rt = []
    _pl4_instructions_keyresp_allKeys = []
    # keep track of which components have finished
    pl4_instructionsComponents = [pl4_instructions_keyresp, pl4_instructions_txt]
    for thisComponent in pl4_instructionsComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "pl4_instructions" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *pl4_instructions_keyresp* updates
        
        # if pl4_instructions_keyresp is starting this frame...
        if pl4_instructions_keyresp.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl4_instructions_keyresp.frameNStart = frameN  # exact frame index
            pl4_instructions_keyresp.tStart = t  # local t and not account for scr refresh
            pl4_instructions_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl4_instructions_keyresp, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl4_instructions_keyresp.status = STARTED
            # keyboard checking is just starting
            pl4_instructions_keyresp.clock.reset()  # now t=0
            pl4_instructions_keyresp.clearEvents(eventType='keyboard')
        if pl4_instructions_keyresp.status == STARTED:
            theseKeys = pl4_instructions_keyresp.getKeys(keyList=['y','n','left','right','space'], ignoreKeys=["escape"], waitRelease=False)
            _pl4_instructions_keyresp_allKeys.extend(theseKeys)
            if len(_pl4_instructions_keyresp_allKeys):
                pl4_instructions_keyresp.keys = _pl4_instructions_keyresp_allKeys[-1].name  # just the last key pressed
                pl4_instructions_keyresp.rt = _pl4_instructions_keyresp_allKeys[-1].rt
                pl4_instructions_keyresp.duration = _pl4_instructions_keyresp_allKeys[-1].duration
                # a response ends the routine
                continueRoutine = False
        
        # *pl4_instructions_txt* updates
        
        # if pl4_instructions_txt is starting this frame...
        if pl4_instructions_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            pl4_instructions_txt.frameNStart = frameN  # exact frame index
            pl4_instructions_txt.tStart = t  # local t and not account for scr refresh
            pl4_instructions_txt.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(pl4_instructions_txt, 'tStartRefresh')  # time at next scr refresh
            # update status
            pl4_instructions_txt.status = STARTED
            pl4_instructions_txt.setAutoDraw(True)
        
        # if pl4_instructions_txt is active this frame...
        if pl4_instructions_txt.status == STARTED:
            # update params
            pass
        
        # check for quit (typically the Esc key)
        if defaultKeyboard.getKeys(keyList=["escape"]):
            thisExp.status = FINISHED
        if thisExp.status == FINISHED or endExpNow:
            endExperiment(thisExp, inputs=inputs, win=win)
            return
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in pl4_instructionsComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "pl4_instructions" ---
    for thisComponent in pl4_instructionsComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # check responses
    if pl4_instructions_keyresp.keys in ['', [], None]:  # No response was made
        pl4_instructions_keyresp.keys = None
    thisExp.addData('pl4_instructions_keyresp.keys',pl4_instructions_keyresp.keys)
    if pl4_instructions_keyresp.keys != None:  # we had a response
        thisExp.addData('pl4_instructions_keyresp.rt', pl4_instructions_keyresp.rt)
        thisExp.addData('pl4_instructions_keyresp.duration', pl4_instructions_keyresp.duration)
    thisExp.nextEntry()
    # the Routine "pl4_instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # set up handler to look after randomisation of conditions etc
    pl4_loop = data.TrialHandler(nReps=1.0, method='fullRandom', 
        extraInfo=expInfo, originPath=-1,
        trialList=data.importConditions('pl4.xlsx'),
        seed=None, name='pl4_loop')
    thisExp.addLoop(pl4_loop)  # add the loop to the experiment
    thisPl4_loop = pl4_loop.trialList[0]  # so we can initialise stimuli with some values
    # abbreviate parameter names if possible (e.g. rgb = thisPl4_loop.rgb)
    if thisPl4_loop != None:
        for paramName in thisPl4_loop:
            globals()[paramName] = thisPl4_loop[paramName]
    
    for thisPl4_loop in pl4_loop:
        currentLoop = pl4_loop
        thisExp.timestampOnFlip(win, 'thisRow.t')
        # pause experiment here if requested
        if thisExp.status == PAUSED:
            pauseExperiment(
                thisExp=thisExp, 
                inputs=inputs, 
                win=win, 
                timers=[routineTimer], 
                playbackComponents=[]
        )
        # abbreviate parameter names if possible (e.g. rgb = thisPl4_loop.rgb)
        if thisPl4_loop != None:
            for paramName in thisPl4_loop:
                globals()[paramName] = thisPl4_loop[paramName]
        
        # --- Prepare to start Routine "pl4_setup" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl4_setup_code
        pl4_task_step2_index = [stimLeft_index, stimRight_index]
        random.shuffle(pl4_task_step2_index)
        
        pl4_task_stimLeft_var = l_t_step1_stims[pl4_task_step2_index[0]]
        pl4_task_stimRight_var = l_t_step1_stims[pl4_task_step2_index[1]]
        # keep track of which components have finished
        pl4_setupComponents = []
        for thisComponent in pl4_setupComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl4_setup" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl4_setupComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl4_setup" ---
        for thisComponent in pl4_setupComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl4_setup" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl4_task" ---
        continueRoutine = True
        # update component parameters for each repeat
        pl4_task_lickert.reset()
        pl4_task_keyresp.keys = []
        pl4_task_keyresp.rt = []
        _pl4_task_keyresp_allKeys = []
        pl4_task_stimLeft_img.setImage(pl4_task_stimLeft_var["file"])
        pl4_task_stimRight_img.setImage(pl4_task_stimRight_var["file"])
        # keep track of which components have finished
        pl4_taskComponents = [pl4_task_stimUp_txt, pl4_task_fixation_txt, pl4_task_lickert, pl4_task_keyresp, pl4_task_stimLeft_img, pl4_task_stimRight_img]
        for thisComponent in pl4_taskComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl4_task" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # *pl4_task_stimUp_txt* updates
            
            # if pl4_task_stimUp_txt is starting this frame...
            if pl4_task_stimUp_txt.status == NOT_STARTED and tThisFlip >= 0.7-frameTolerance:
                # keep track of start time/frame for later
                pl4_task_stimUp_txt.frameNStart = frameN  # exact frame index
                pl4_task_stimUp_txt.tStart = t  # local t and not account for scr refresh
                pl4_task_stimUp_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl4_task_stimUp_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl4_task_stimUp_txt.status = STARTED
                pl4_task_stimUp_txt.setAutoDraw(True)
            
            # if pl4_task_stimUp_txt is active this frame...
            if pl4_task_stimUp_txt.status == STARTED:
                # update params
                pass
            
            # *pl4_task_fixation_txt* updates
            
            # if pl4_task_fixation_txt is starting this frame...
            if pl4_task_fixation_txt.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
                # keep track of start time/frame for later
                pl4_task_fixation_txt.frameNStart = frameN  # exact frame index
                pl4_task_fixation_txt.tStart = t  # local t and not account for scr refresh
                pl4_task_fixation_txt.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl4_task_fixation_txt, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl4_task_fixation_txt.status = STARTED
                pl4_task_fixation_txt.setAutoDraw(True)
            
            # if pl4_task_fixation_txt is active this frame...
            if pl4_task_fixation_txt.status == STARTED:
                # update params
                pass
            
            # if pl4_task_fixation_txt is stopping this frame...
            if pl4_task_fixation_txt.status == STARTED:
                # is it time to stop? (based on global clock, using actual start)
                if tThisFlipGlobal > pl4_task_fixation_txt.tStartRefresh + 0.5-frameTolerance:
                    # keep track of stop time/frame for later
                    pl4_task_fixation_txt.tStop = t  # not accounting for scr refresh
                    pl4_task_fixation_txt.frameNStop = frameN  # exact frame index
                    # update status
                    pl4_task_fixation_txt.status = FINISHED
                    pl4_task_fixation_txt.setAutoDraw(False)
            
            # *pl4_task_lickert* updates
            
            # if pl4_task_lickert is starting this frame...
            if pl4_task_lickert.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl4_task_lickert.frameNStart = frameN  # exact frame index
                pl4_task_lickert.tStart = t  # local t and not account for scr refresh
                pl4_task_lickert.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl4_task_lickert, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl4_task_lickert.status = STARTED
                pl4_task_lickert.setAutoDraw(True)
            
            # if pl4_task_lickert is active this frame...
            if pl4_task_lickert.status == STARTED:
                # update params
                pass
            
            # *pl4_task_keyresp* updates
            
            # if pl4_task_keyresp is starting this frame...
            if pl4_task_keyresp.status == NOT_STARTED and t >= 0.7-frameTolerance:
                # keep track of start time/frame for later
                pl4_task_keyresp.frameNStart = frameN  # exact frame index
                pl4_task_keyresp.tStart = t  # local t and not account for scr refresh
                pl4_task_keyresp.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl4_task_keyresp, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl4_task_keyresp.status = STARTED
                # keyboard checking is just starting
                pl4_task_keyresp.clock.reset()  # now t=0
                pl4_task_keyresp.clearEvents(eventType='keyboard')
            if pl4_task_keyresp.status == STARTED:
                theseKeys = pl4_task_keyresp.getKeys(keyList=['space'], ignoreKeys=["escape"], waitRelease=False)
                _pl4_task_keyresp_allKeys.extend(theseKeys)
                if len(_pl4_task_keyresp_allKeys):
                    pl4_task_keyresp.keys = _pl4_task_keyresp_allKeys[-1].name  # just the last key pressed
                    pl4_task_keyresp.rt = _pl4_task_keyresp_allKeys[-1].rt
                    pl4_task_keyresp.duration = _pl4_task_keyresp_allKeys[-1].duration
                    # a response ends the routine
                    continueRoutine = False
            
            # *pl4_task_stimLeft_img* updates
            
            # if pl4_task_stimLeft_img is starting this frame...
            if pl4_task_stimLeft_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl4_task_stimLeft_img.frameNStart = frameN  # exact frame index
                pl4_task_stimLeft_img.tStart = t  # local t and not account for scr refresh
                pl4_task_stimLeft_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl4_task_stimLeft_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl4_task_stimLeft_img.status = STARTED
                pl4_task_stimLeft_img.setAutoDraw(True)
            
            # if pl4_task_stimLeft_img is active this frame...
            if pl4_task_stimLeft_img.status == STARTED:
                # update params
                pass
            
            # *pl4_task_stimRight_img* updates
            
            # if pl4_task_stimRight_img is starting this frame...
            if pl4_task_stimRight_img.status == NOT_STARTED and tThisFlip >= .7-frameTolerance:
                # keep track of start time/frame for later
                pl4_task_stimRight_img.frameNStart = frameN  # exact frame index
                pl4_task_stimRight_img.tStart = t  # local t and not account for scr refresh
                pl4_task_stimRight_img.tStartRefresh = tThisFlipGlobal  # on global time
                win.timeOnFlip(pl4_task_stimRight_img, 'tStartRefresh')  # time at next scr refresh
                # update status
                pl4_task_stimRight_img.status = STARTED
                pl4_task_stimRight_img.setAutoDraw(True)
            
            # if pl4_task_stimRight_img is active this frame...
            if pl4_task_stimRight_img.status == STARTED:
                # update params
                pass
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl4_taskComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl4_task" ---
        for thisComponent in pl4_taskComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        pl4_loop.addData('pl4_task_lickert.response', pl4_task_lickert.getRating())
        pl4_loop.addData('pl4_task_lickert.rt', pl4_task_lickert.getRT())
        # check responses
        if pl4_task_keyresp.keys in ['', [], None]:  # No response was made
            pl4_task_keyresp.keys = None
        pl4_loop.addData('pl4_task_keyresp.keys',pl4_task_keyresp.keys)
        if pl4_task_keyresp.keys != None:  # we had a response
            pl4_loop.addData('pl4_task_keyresp.rt', pl4_task_keyresp.rt)
            pl4_loop.addData('pl4_task_keyresp.duration', pl4_task_keyresp.duration)
        # the Routine "pl4_task" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        
        # --- Prepare to start Routine "pl4_data" ---
        continueRoutine = True
        # update component parameters for each repeat
        # Run 'Begin Routine' code from pl4_data_code
        thisExp.addData("pl4_task_stimLeft", pl4_task_stimLeft_var["name"])
        thisExp.addData("pl4_task_stimRight", pl4_task_stimRight_var["name"])
        
        # keep track of which components have finished
        pl4_dataComponents = []
        for thisComponent in pl4_dataComponents:
            thisComponent.tStart = None
            thisComponent.tStop = None
            thisComponent.tStartRefresh = None
            thisComponent.tStopRefresh = None
            if hasattr(thisComponent, 'status'):
                thisComponent.status = NOT_STARTED
        # reset timers
        t = 0
        _timeToFirstFrame = win.getFutureFlipTime(clock="now")
        frameN = -1
        
        # --- Run Routine "pl4_data" ---
        routineForceEnded = not continueRoutine
        while continueRoutine:
            # get current time
            t = routineTimer.getTime()
            tThisFlip = win.getFutureFlipTime(clock=routineTimer)
            tThisFlipGlobal = win.getFutureFlipTime(clock=None)
            frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
            # update/draw components on each frame
            
            # check for quit (typically the Esc key)
            if defaultKeyboard.getKeys(keyList=["escape"]):
                thisExp.status = FINISHED
            if thisExp.status == FINISHED or endExpNow:
                endExperiment(thisExp, inputs=inputs, win=win)
                return
            
            # check if all components have finished
            if not continueRoutine:  # a component has requested a forced-end of Routine
                routineForceEnded = True
                break
            continueRoutine = False  # will revert to True if at least one component still running
            for thisComponent in pl4_dataComponents:
                if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                    continueRoutine = True
                    break  # at least one component has not yet finished
            
            # refresh the screen
            if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
                win.flip()
        
        # --- Ending Routine "pl4_data" ---
        for thisComponent in pl4_dataComponents:
            if hasattr(thisComponent, "setAutoDraw"):
                thisComponent.setAutoDraw(False)
        # the Routine "pl4_data" was not non-slip safe, so reset the non-slip timer
        routineTimer.reset()
        thisExp.nextEntry()
        
        if thisSession is not None:
            # if running in a Session with a Liaison client, send data up to now
            thisSession.sendExperimentData()
    # completed 1.0 repeats of 'pl4_loop'
    
    
    # mark experiment as finished
    endExperiment(thisExp, win=win, inputs=inputs)


def saveData(thisExp):
    """
    Save data from this experiment
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    """
    filename = thisExp.dataFileName
    # these shouldn't be strictly necessary (should auto-save)
    thisExp.saveAsWideText(filename + '.csv', delim='auto')
    thisExp.saveAsPickle(filename)


def endExperiment(thisExp, inputs=None, win=None):
    """
    End this experiment, performing final shut down operations.
    
    This function does NOT close the window or end the Python process - use `quit` for this.
    
    Parameters
    ==========
    thisExp : psychopy.data.ExperimentHandler
        Handler object for this experiment, contains the data to save and information about 
        where to save it to.
    inputs : dict
        Dictionary of input devices by name.
    win : psychopy.visual.Window
        Window for this experiment.
    """
    if win is not None:
        # remove autodraw from all current components
        win.clearAutoDraw()
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed
        win.flip()
    # mark experiment handler as finished
    thisExp.status = FINISHED
    # shut down eyetracker, if there is one
    if inputs is not None:
        if 'eyetracker' in inputs and inputs['eyetracker'] is not None:
            inputs['eyetracker'].setConnectionState(False)
    logging.flush()


def quit(thisExp, win=None, inputs=None, thisSession=None):
    """
    Fully quit, closing the window and ending the Python process.
    
    Parameters
    ==========
    win : psychopy.visual.Window
        Window to close.
    inputs : dict
        Dictionary of input devices by name.
    thisSession : psychopy.session.Session or None
        Handle of the Session object this experiment is being run from, if any.
    """
    thisExp.abort()  # or data files will save again on exit
    # make sure everything is closed down
    if win is not None:
        # Flip one final time so any remaining win.callOnFlip() 
        # and win.timeOnFlip() tasks get executed before quitting
        win.flip()
        win.close()
    if inputs is not None:
        if 'eyetracker' in inputs and inputs['eyetracker'] is not None:
            inputs['eyetracker'].setConnectionState(False)
    logging.flush()
    if thisSession is not None:
        thisSession.stop()
    # terminate Python process
    core.quit()


# if running this experiment as a script...
if __name__ == '__main__':
    # call all functions in order
    expInfo = showExpInfoDlg(expInfo=expInfo)
    thisExp = setupData(expInfo=expInfo)
    logFile = setupLogging(filename=thisExp.dataFileName)
    win = setupWindow(expInfo=expInfo)
    inputs = setupInputs(expInfo=expInfo, thisExp=thisExp, win=win)
    run(
        expInfo=expInfo, 
        thisExp=thisExp, 
        win=win, 
        inputs=inputs
    )
    saveData(thisExp=thisExp)
    quit(thisExp=thisExp, win=win, inputs=inputs)
