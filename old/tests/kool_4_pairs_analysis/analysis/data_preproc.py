import os 
import sys
import numpy as np 
import pandas as pd 

def create_sub_dict(subnum,df):
	"""
	Generate a dictionary for a subject that is passed through to other functions, the df provided here has to be the stakes df 
	"""
	sub_dict = {}
	sub_df = df[df['subid']==subnum]
	sub_df['response1'] = sub_df['response1'].replace(70,1)
	sub_df['response1'] = sub_df['response1'].replace(74,2)
	if sub_df['high_arm'].unique()[0] == 1:
		sub_dict['high_arm'] = 'inside'
	else:
		sub_dict['high_arm'] = 'outside'
	envs = ['desert','forest','library','restaurant']
	object_list = []
	for i in [1,2,3,4]:
		sub_dict[envs[i-1]] = sub_df[sub_df['state1']==i].iloc[0][['stim_left','stim_right']].values
		object_list.append(list(sub_dict[envs[i-1]]))

	flat_list = [item for sublist in object_list for item in sublist]
	sub_dict['object_list'] = flat_list

	condensed = sub_df[['state1','stim_left','stim_right','response1','state2']] 
	condensed = condensed.drop_duplicates()
	condensed = condensed.sort_values(by=['state1','response1'])
	rew_1 = []
	rew_2 = []
	for i in range(len(condensed)):
		if condensed.iloc[i].response1 == -1:
			continue

		if (condensed.iloc[i].response1 == 1) and (condensed.iloc[i].state2 == '1'):
			rew_1.append(condensed.iloc[i]['stim_left'])
			rew_2.append(condensed.iloc[i]['stim_right'])
		elif (condensed.iloc[i].response1 == 1) and (condensed.iloc[i].state2 == '2') :
			rew_2.append(condensed.iloc[i]['stim_left'])
			rew_1.append(condensed.iloc[i]['stim_right'])
	sub_dict['reward_1'] = list(dict.fromkeys(rew_1)) # grabs every other index and is sorted by desert,forest,library,restaurant
	sub_dict['reward_2'] = list(dict.fromkeys(rew_2))
	sub_dict['task_backgrounds'] = list(sub_df.background.unique())
	check = sub_df.groupby(['state2'])['stim_state2'].unique()
	sub_dict['reward_1_object'] = check.loc['1'][0]
	sub_dict['reward_2_object'] = check.loc['2'][0]
	return(sub_dict)

def create_fit_df(subnum,df):
	"""
	Generate a subject specific df for use in model fitting
	"""
	sub_df = df[df['subid']==subnum]
	sub_df['response1'] = sub_df['response1'].replace(70,1)
	sub_df['response1'] = sub_df['response1'].replace(74,2)
	sub_df['response1'] = sub_df['response1'].replace('f',1)
	sub_df['response1'] = sub_df['response1'].replace('j',2)
	condensed = sub_df[['state1','stim_left','stim_right','response1','choice1']] 
	condensed = condensed.drop_duplicates()
	condensed = condensed.sort_values(by=['state1','response1'])
	condensed
	new_map_dict = {}
	for i in range(len(condensed)):
		if condensed.iloc[i].response1 == -1:
			continue
		if condensed.iloc[i].response1 == 1: 
			new_map_dict[condensed.iloc[i].stim_left] = condensed.iloc[i].choice1
		elif condensed.iloc[i].response1 == 2:
			new_map_dict[condensed.iloc[i].stim_right] = condensed.iloc[i].choice1
	sub_df['stim_left_num'] = sub_df['stim_left'].replace(new_map_dict)
	sub_df['stim_right_num'] = sub_df['stim_right'].replace(new_map_dict)
