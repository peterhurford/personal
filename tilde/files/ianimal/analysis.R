# Load libraries
if (!require("dplyr")) { install.packages("dplyr") }; library(dplyr)
if (!require("devtools")) { install.packages("devtools") }; library(devtools)
if (!require("readr")) { install.packages("readr") }; library(readr)
if (!require("surveytools2")) { install_github("peterhurford/surveytools2") }; library(surveytools2)

# Load data
data <- read_csv("finalStudy.csv")
coast <- read_csv("coast.csv")

# Add on coast data to main dataset
data <- left_join(data, coast, by = "campus")

# Drop people who have previously participated
data <- filter(data, participated != 1)

# Create social desirability scale
# Marlowe-Crowne Scale (Reynolds’s Form C)
# http://faunalytics.org/social-desirability-bias/
data$socdes <- data$socdes5 + data$socdes7 + data$socdes9 + data$socdes10 + data$socdes13 +
               (data$socdes1 == 0) + (data$socdes2 == 0) + (data$socdes3 == 0) + # Reverse coding
               (data$socdes4 == 0) + (data$socdes6 == 0) + (data$socdes8 == 0) +
							 (data$socdes11 == 0) + (data$socdes12 == 0)
data <- data[, setdiff(colnames(data), get_vars(data, "socdes."))] # Drop components of scale

# Create second group that aggregates treatment
# Condition 0 -> Control, Condition 1 -> 2D, Condition 2 -> 3D
data$treatment <- (data$condition == 1 | data$condition == 2) # 0 if control, 1 if treatment

# Drop unused variables
cols_to_drop <- c("campus", "ID", "start.date.t1", "participated", "data.available")
data <- data[, setdiff(colnames(data), cols_to_drop)]

# Make new DVs
data$no_pork.t1 <- (data$diet.t1 == 0)
data$no_pork.t2 <- (data$diet.t2 == 0)
data$is_reduce.t1 <- (data$diet.t1 <= 2)
data$is_reduce.t2 <- (data$diet.t2 <= 2)
data$change_nonpork <- data$no_pork.t2 - data$no_pork.t1
data$change_diet <- data$diet.t2 - data$diet.t1
data$change_reduce <- data$is_reduce.t2 - data$is_reduce.t1
data$food.t1 <- (data$diet.t1 == 1) * 2 + (data$diet.t1 == 2) * 4 + (data$diet.t1 == 3) * 12 + (data$diet.t1 == 4) * 22 + (data$diet.t1 == 5) * 31
data$food.t2 <- (data$diet.t2 == 1) * 2 + (data$diet.t2 == 2) * 4 + (data$diet.t2 == 3) * 12 + (data$diet.t2 == 4) * 22 + (data$diet.t2 == 5) * 31
data$change_food <- data$food.t2 - data$food.t1


# Impute people who aren't at T2 as no change
data[is.na(data$change_nonpork), "change_nonpork"] <- 0
data[is.na(data$change_diet), "change_diet"] <- 0
data[is.na(data$change_food), "change_food"] <- 0

# Drop people who aren't at T2
data2 <- filter(data, !is.na(no_pork.t2))

# Impute people who aren't at T3 as eating pork
data3 <- data2
data3$no_pork.t2 <- 0
data3$change_nonpork <- data3$no_pork.t2 - data3$no_pork.t1


tab(data2, diet.t1, diet.t2, percent = TRUE)
# diet.t1 ### diet.t2

    # 0            1            2           3            4           5
  # 0 499 (88.63%) 47 (8.35%)   7 (1.24%)   7 (1.24%)    0 (0%)      3 (0.53%)
  # 1 67 (17.49%)  219 (57.18%) 55 (14.36%) 34 (8.88%)   5 (1.31%)   3 (0.78%)
  # 2 19 (8.76%)   85 (39.17%)  59 (27.19%) 48 (22.12%)  5 (2.3%)    1 (0.46%)
  # 3 18 (5.1%)    89 (25.21%)  77 (21.81%) 126 (35.69%) 29 (8.22%)  14 (3.97%)
  # 4 7 (5.11%)    20 (14.6%)   15 (10.95%) 58 (42.34%)  26 (18.98%) 11 (8.03%)
  # 5 4 (4.4%)     15 (16.48%)  13 (14.29%) 25 (27.47%)  14 (15.38%) 20 (21.98%)

tab(data2, diet.t1, diet.t2, percent = TRUE, filter(treatment == 1))
# diet.t1 ### diet.t2
# Filters:  treatment == 1

#     0            1           2           3           4           5
#   0 319 (90.11%) 29 (8.19%)  2 (0.56%)   3 (0.85%)   0 (0%)      1 (0.28%)
#   1 55 (21.74%)  147 (58.1%) 27 (10.67%) 19 (7.51%)  2 (0.79%)   3 (1.19%)
#   2 13 (9.35%)   53 (38.13%) 42 (30.22%) 29 (20.86%) 2 (1.44%)   0 (0%)
#   3 14 (6.17%)   59 (25.99%) 55 (24.23%) 75 (33.04%) 14 (6.17%)  10 (4.41%)
#   4 6 (6.67%)    12 (13.33%) 10 (11.11%) 44 (48.89%) 14 (15.56%) 4 (4.44%)
#   5 4 (7.14%)    9 (16.07%)  8 (14.29%)  15 (26.79%) 10 (17.86%) 10 (17.86%)

tab(data2, diet.t1, diet.t2, percent = TRUE, filter(treatment == 0))
# diet.t1 ### diet.t2
# Filters:  treatment == 0

#     0            1           2           3           4           5
#   0 180 (86.12%) 18 (8.61%)  5 (2.39%)   4 (1.91%)   0 (0%)      2 (0.96%)
#   1 12 (9.23%)   72 (55.38%) 28 (21.54%) 15 (11.54%) 3 (2.31%)   0 (0%)
#   2 6 (7.69%)    32 (41.03%) 17 (21.79%) 19 (24.36%) 3 (3.85%)   1 (1.28%)
#   3 4 (3.17%)    30 (23.81%) 22 (17.46%) 51 (40.48%) 15 (11.9%)  4 (3.17%)
#   4 1 (2.13%)    8 (17.02%)  5 (10.64%)  14 (29.79%) 12 (25.53%) 7 (14.89%)
#   5 0 (0%)       6 (17.14%)  5 (14.29%)  10 (28.57%) 4 (11.43%)  10 (28.57%)

summarise(group_by(data2, treatment), mean(change_food, na.rm = TRUE))
# A tibble: 2 x 2
  # treatment `mean(change_food, na.rm = TRUE)`
  # <lgl>                                 <dbl>
# 1 FALSE                                 -1.01
# 2 TRUE                                  -2.05


tab(data2, no_pork.t1, no_pork.t2, percent = TRUE, filter(treatment == 1))
# no_pork.t1 ### no_pork.t2
# Filters:  treatment == 1

#         FALSE        TRUE
#   FALSE 673 (87.97%) 92 (12.03%)
#   TRUE  35 (9.89%)   319 (90.11%)

tab(data2, no_pork.t1, no_pork.t2, percent = TRUE, filter(treatment == 0))
# no_pork.t1 ### no_pork.t2
# Filters:  treatment == 0

#         FALSE        TRUE
#   FALSE 393 (94.47%) 23 (5.53%)
#   TRUE  29 (13.88%)  180 (86.12%)

tab(data2, change_nonpork, treatment, percent = TRUE, freq = FALSE, byrow = FALSE)
# change_nonpork ### treatment

#       FALSE   TRUE
#   -1 0.0464 0.0313
#   0  0.9168 0.8865
#   1  0.0368 0.0822


tab(data2, is_reduce.t1, is_reduce.t2, percent = TRUE, filter(treatment == 1))
# is_reduce.t1 ### is_reduce.t2
# Filters:  treatment == 1

        # FALSE        TRUE
  # FALSE 196 (52.55%) 177 (47.45%)
  # TRUE  59 (7.91%)   687 (92.09%)

tab(data2, is_reduce.t1, is_reduce.t2, percent = TRUE, filter(treatment == 0))
# is_reduce.t1 ### is_reduce.t2
# Filters:  treatment == 0

       # FALSE        TRUE
 # FALSE 127 (61.06%) 81 (38.94%)
 # TRUE  47 (11.27%)  370 (88.73%)

tab(data2, change_reduce, treatment, percent = TRUE, freq = FALSE, byrow = FALSE)
# change_reduce ### treatment

     # FALSE   TRUE
 # -1 0.0752 0.0527
 # 0  0.7952 0.7891
 # 1  0.1296 0.1582


tab(data2, change_diet, treatment, percent = TRUE, freq = FALSE, byrow = FALSE)
# change_diet ### treatment

#       FALSE   TRUE
#   -5 0.0000 0.0036
#   -4 0.0112 0.0134
#   -3 0.0272 0.0304
#   -2 0.0816 0.0867
#   -1 0.1344 0.1939
#   0  0.5472 0.5424
#   1  0.1392 0.0920
#   2  0.0432 0.0295
#   3  0.0128 0.0045
#   4  0.0000 0.0027
#   5  0.0032 0.0009


ctab(data2, no_pork.t1, treatment)
# no_pork.t1 ### treatment

#          FALSE   TRUE
#   FALSE 0.6656 0.6836
#   TRUE  0.3344 0.3164


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 353.69, df = 1, p-value < 2.2e-16

ctab(data2, no_pork.t2, treatment)
# no_pork.t2 ### treatment

#          FALSE   TRUE
#   FALSE 0.6752 0.6327
#   TRUE  0.3248 0.3673


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 291.31, df = 1, p-value < 2.2e-16


ctab(data2, change_nonpork, treatment)
# change_nonpork ### treatment
# # A tibble: 2 x 5
#   treatment     N     mean median    sd
#   <lgl>     <int>    <dbl>  <int> <dbl>
# 1 FALSE       625 -0.00960      0 0.289
# 2 TRUE       1119  0.0509       0 0.333


#         Welch Two Sample t-test

# data:  x by y
# t = 3.9713, df = 1450.5, p-value = 7.499e-05


ctab(data2, change_reduce, treatment)
# change_reduce ### treatment
# # A tibble: 2 x 5
#   treatment     N   mean median    sd
#   <lgl>     <int>  <dbl>  <int> <dbl>
# 1 FALSE       625 0.0544      0 0.450
# 2 TRUE       1119 0.105       0 0.447


#         Welch Two Sample t-test

# data:  x by y
# t = 2.2782, df = 1285, p-value = 0.02288


ctab(data2, change_diet, treatment)
# change_diet ### treatment
# # A tibble: 2 x 5
#   treatment     N   mean median    sd
#   <lgl>     <int>  <dbl>  <int> <dbl>
# 1 FALSE       625 -0.144      0  1.17
# 2 TRUE       1119 -0.350      0  1.15


#         Welch Two Sample t-test
 
# data:  x by y
# t = -3.554, df = 1266.2, p-value = 0.0003934
# data:  x by y
# t = -3.554, df = 1266.2, p-value = 0.0003934
# alternative hypothesis: true difference in means is not equal to 0
# 95 percent confidence interval:
#  -0.32019925 -0.09242631


ctab(data, change_diet, treatment)
# change_diet ### treatment
# # A tibble: 2 x 5
#   treatment     N    mean median    sd
#   <lgl>     <int>   <dbl>  <dbl> <dbl>
#   1 FALSE      1181 -0.0762     0. 0.855
#   2 TRUE       1797 -0.218      0. 0.920


#           Welch Two Sample t-test

#   data:  x by y
#   t = -4.2993, df = 2649.3, p-value = 1.775e-05
#   alternative hypothesis: true difference in means is not equal to 0
#   95 percent confidence interval:
#    -0.20666887 -0.07720061



ctab(data2, change_food, treatment)
# change_food ### treatment
# # A tibble: 2 x 5
#   treatment     N  mean median    sd
#   <lgl>     <int> <dbl>  <dbl> <dbl>
# 1 FALSE       625 -1.01     0.  7.58
# 2 TRUE       1119 -2.05     0.  7.38


#         Welch Two Sample t-test

# data:  x by y
# t = -2.7883, df = 1262.3, p-value = 0.005378
# alternative hypothesis: true difference in means is not equal to 0
# 95 percent confidence interval:
#  -1.7809882 -0.3098758


ctab(data, change_nonpork, treatment)
# change_nonpork ### treatment
# # A tibble: 2 x 5
#   treatment     N     mean median    sd
#   <lgl>     <int>    <dbl>  <dbl> <dbl>
# 1 FALSE      1181 -0.00508     0. 0.210
# 2 TRUE       1797  0.0317      0. 0.264


#         Welch Two Sample t-test

# data:  x by y
# t = 4.219, df = 2870.8, p-value = 2.53e-05
# alternative hypothesis: true difference in means is not equal to 0
# 95 percent confidence interval:
#  0.01969694 0.05390300
# sample estimates:
# mean in group FALSE  mean in group TRUE
#          0.03171953         -0.00508044


ctab(data3, change_nonpork, treatment)
# change_nonpork ### treatment
# # A tibble: 2 x 5
#   treatment     N   mean median    sd
#   <lgl>     <int>  <dbl>  <dbl> <dbl>
#   1 FALSE       625 -0.334     0. 0.472
#   2 TRUE       1119 -0.316     0. 0.465


#           Welch Two Sample t-test

#   data:  x by y
#   t = 0.76939, df = 1275.1, p-value = 0.4418
#   alternative hypothesis: true difference in means is not equal to 0
#   95 percent confidence interval:
#    -0.02796867  0.06406090
#   sample estimates:
#   mean in group FALSE  mean in group TRUE
#            -0.3163539          -0.3344000



ctab(data, change_diet, treatment)
# change_diet ### treatment
# # A tibble: 2 x 5
#   treatment     N    mean median    sd
#   <lgl>     <int>   <dbl>  <dbl> <dbl>
# 1 FALSE      1181 -0.0762     0. 0.855
# 2 TRUE       1797 -0.218      0. 0.920


#         Welch Two Sample t-test

# data:  x by y
# t = -4.2993, df = 2649.3, p-value = 1.775e-05


ctab(data, change_food, treatment)
# change_food ### treatment
# # A tibble: 2 x 5
#   treatment     N   mean median    sd
#   <lgl>     <int>  <dbl>  <dbl> <dbl>
#   1 FALSE      1181 -0.533     0.  5.53
#   2 TRUE       1797 -1.28      0.  5.91


#           Welch Two Sample t-test

#   data:  x by y
#   t = -3.4988, df = 2637.2, p-value = 0.0004751
#   alternative hypothesis: true difference in means is not equal to 0
#   95 percent confidence interval:
#    -1.1626627 -0.3275084


summarise(group_by(data, treatment), mean(food.t1, na.rm = TRUE))
# # A tibble: 2 x 2
#     treatment `mean(food.t1, na.rm = TRUE)`
#     <lgl>                             <dbl>
#     1 FALSE                              7.58
#     2 TRUE                               7.19

summarise(group_by(data, treatment), mean(food.t2, na.rm = TRUE))
# # A tibble: 2 x 2
#   treatment `mean(food.t2, na.rm = TRUE)`
#   <lgl>                             <dbl>
#   1 FALSE                              5.72
#   2 TRUE                               4.65


tab(data, no_pork.t1, no_pork.t2, percent = TRUE, filter(treatment == 1))
# no_pork.t1 ### no_pork.t2
# Filters:  treatment == 1

#         FALSE       TRUE         <NA>
#   FALSE 673 (53.2%) 92 (7.27%)   500 (39.53%)
#   TRUE  35 (6.58%)  319 (59.96%) 178 (33.46%)

tab(data, no_pork.t1, no_pork.t2, percent = TRUE, filter(treatment == 0))
# no_pork.t1 ### no_pork.t2
# Filters:  treatment == 0

#         FALSE        TRUE         <NA>
#   FALSE 393 (46.73%) 23 (2.73%)   425 (50.54%)
#   TRUE  29 (8.53%)   180 (52.94%) 131 (38.53%)


var_summary(filter(data2, change_food < 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
    # -9.538023    -10.000000    -31.000000     -2.000000      7.253602
       # length           sum        num_na num_over_zero
   # 526.000000  -5017.000000      0.000000      0.000000

var_summary(filter(data2, change_food > 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
     # 7.776952      8.000000      2.000000     31.000000      6.208629
       # length           sum        num_na num_over_zero
   # 269.000000   2092.000000      0.000000    269.000000

var_summary(filter(data2, change_food == 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
         #    0             0             0             0             0
       # length           sum        num_na num_over_zero
         #  949             0             0             0

var_summary(filter(data2, treatment == 0, change_food < 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
    # -9.955975    -10.000000    -29.000000     -2.000000      7.473452
       # length           sum        num_na num_over_zero
   # 159.000000  -1583.000000      0.000000      0.000000

var_summary(filter(data2, treatment == 0, change_food == 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
         #    0             0             0             0             0
       # length           sum        num_na num_over_zero
         #  342             0             0             0

var_summary(filter(data2, treatment == 0, change_food > 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
     # 7.693548      8.000000      2.000000     31.000000      6.082331
       # length           sum        num_na num_over_zero
   # 124.000000    954.000000      0.000000    124.000000

var_summary(filter(data2, treatment == 1, change_food < 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
    # -9.356948     -9.000000    -31.000000     -2.000000      7.159052
       # length           sum        num_na num_over_zero
   # 367.000000  -3434.000000      0.000000      0.000000

var_summary(filter(data2, treatment == 1, change_food == 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
         #    0             0             0             0             0
       # length           sum        num_na num_over_zero
         #  607             0             0             0

var_summary(filter(data2, treatment == 1, change_food > 0)$change_food, verbose = TRUE)
         # mean        median           min           max            sd
     # 7.848276      8.000000      2.000000     31.000000      6.334793
       # length           sum        num_na num_over_zero
   # 145.000000   1138.000000      0.000000    145.000000



# 1265 people eat pork at T1. Of those, 92 stopped eating pork. 500 people didn't respond.
# 35 people who previously were not eating pork started eating pork. Net 57.
# Assuming non-response is no change, that's 57/1265 = 4.5% rate

# People eat 7.19 servings of pork per month at T1 and 4.65 servings of pork per month at T2
# 2.54 servings per month reduced per person
# 95% confidence interval in differential treatment servings reduction: -1.7809882 -0.3098758


ctab(data, data$minimize.pork.t1 >= 4, treatment)
# data$minimize.pork.t1 >= 4 ### treatment

#          FALSE   TRUE
#   FALSE 0.3997 0.2226
#   TRUE  0.6003 0.7702
#   <NA>  0.0000 0.0072


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 68.551, df = 1, p-value < 2.2e-16

ctab(data2, data2$minimize.pork.t2 >= 4, treatment)
# data2$minimize.pork.t2 >= 4 ### treatment

#          FALSE   TRUE
#   FALSE 0.3280 0.2413
#   TRUE  0.6704 0.7578
#   <NA>  0.0016 0.0009


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 29.238, df = 1, p-value = 6.401e-08


ctab(data, data$suffering.t1 >= 4, treatment)
# data$suffering.t1 >= 4 ### treatment

#          FALSE   TRUE
#   FALSE 0.3302 0.1992
#   TRUE  0.6698 0.7935
#   <NA>  0.0000 0.0072


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 140.46, df = 1, p-value < 2.2e-16

ctab(data2, data2$suffering.t2 >= 4, treatment)
# data2$suffering.t2 >= 4 ### treatment

#          FALSE   TRUE
#   FALSE 0.2752 0.2064
#   TRUE  0.7216 0.7918
#   <NA>  0.0032 0.0018

#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 66.679, df = 1, p-value = 3.195e-16


tab(data, suffering.t1 >= 4, suffering.t2 >= 4, filter(treatment == 0), percent = TRUE)
# suffering.t1 >= 4 ### suffering.t2 >= 4
# Filters:  treatment == 0

#         FALSE        TRUE         <NA>
#   FALSE 126 (32.31%) 55 (14.1%)   209 (53.59%)
#   TRUE  46 (5.82%)   396 (50.06%) 349 (44.12%)

tab(data, suffering.t1 >= 4, suffering.t2 >= 4, filter(treatment == 1), percent = TRUE)
# suffering.t1 >= 4 ### suffering.t2 >= 4
# Filters:  treatment == 1

#         FALSE        TRUE         <NA>
#   FALSE 117 (32.68%) 87 (24.3%)   154 (43.02%)
#   TRUE  113 (7.92%)  798 (55.96%) 515 (36.12%)
#   <NA>  1 (7.69%)    1 (7.69%)    11 (84.62%)


tab(data, minimize.pork.t1 >= 4, minimize.pork.t2 >= 4, filter(treatment == 0), percent = TRUE)
# minimize.pork.t1 >= 4 ### minimize.pork.t2 >= 4
# Filters:  treatment == 0

#         FALSE        TRUE         <NA>
#   FALSE 153 (32.42%) 61 (12.92%)  258 (54.66%)
#   TRUE  52 (7.33%)   358 (50.49%) 299 (42.17%)

tab(data, minimize.pork.t1 >= 4, minimize.pork.t2 >= 4, filter(treatment == 1), percent = TRUE)
# minimize.pork.t1 >= 4 ### minimize.pork.t2 >= 4
# Filters:  treatment == 1

#         FALSE       TRUE         <NA>
#   FALSE 154 (38.5%) 85 (21.25%)  161 (40.25%)
#   TRUE  116 (8.38%) 761 (54.99%) 507 (36.63%)
#   <NA>  0 (0%)      2 (15.38%)   11 (84.62%)


cor(data$minimize.pork.t1 >= 4, data$suffering.t1 >= 4, use = "complete.obs")
# 0.45678
cor(data$minimize.pork.t2 >= 4, data$suffering.t2 >= 4, use = "complete.obs")
# 0.4586576
cor(is.na(data$minimize.pork.t2), is.na(data$suffering.t2), use = "complete.obs")
# 0.9986


tab(data, no_pork.t1 == TRUE, no_pork.t2 == TRUE, filter(treatment == 0), percent = TRUE)
# no_pork.t1 == TRUE ### no_pork.t2 == TRUE
# Filters:  treatment == 0

#         FALSE        TRUE         <NA>
#   FALSE 393 (46.73%) 23 (2.73%)   425 (50.54%)
#   TRUE  29 (8.53%)   180 (52.94%) 131 (38.53%)

tab(data, no_pork.t1 == TRUE, no_pork.t2 == TRUE, filter(treatment == 1), percent = TRUE)
# no_pork.t1 == TRUE ### no_pork.t2 == TRUE
# Filters:  treatment == 1

#         FALSE       TRUE         <NA>
#   FALSE 673 (53.2%) 92 (7.27%)   500 (39.53%)
#   TRUE  35 (6.58%)  319 (59.96%) 178 (33.46%)

ctab(data, is.na(no_pork.t2), no_pork.t1 == TRUE)
# is.na(no_pork.t2) ### no_pork.t1 == TRUE

#          FALSE   TRUE
#   FALSE 0.5608 0.6456
#   TRUE  0.4392 0.3544


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 95.73, df = 1, p-value < 2.2e-16

ctab(data, is.na(no_pork.t2), treatment == TRUE)
# is.na(no_pork.t2) ### treatment == TRUE

#          FALSE   TRUE
#   FALSE 0.5292 0.6227
#   TRUE  0.4708 0.3773


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 212.19, df = 1, p-value < 2.2e-16


summarise(group_by(data, gender == 2), mean(food.t1, na.rm = TRUE))
# # A tibble: 2 x 2
#   `gender == 2` `mean(food.t1, na.rm = TRUE)`
#   <lgl>                                 <dbl>
# 1 FALSE                                  6.03
# 2 TRUE                                   9.06

summarise(group_by(data, gender == 2), mean(food.t2, na.rm = TRUE))
# # A tibble: 2 x 2
#   `gender == 2` `mean(food.t2, na.rm = TRUE)`
#   <lgl>                                 <dbl>
# 1 FALSE                                  3.99
# 2 TRUE                                   6.66

summarise(group_by(data, gender == 2, treatment), mean(food.t2, na.rm = TRUE))
# A tibble: 4 x 3
# Groups:   gender == 2 [?]
  # `gender == 2` treatment `mean(food.t2, na.rm = TRUE)`
  # <lgl>         <lgl>                             <dbl>
# 1 FALSE         FALSE                              4.70
# 2 FALSE         TRUE                               3.59
# 3 TRUE          FALSE                              7.31
# 4 TRUE          TRUE                               6.29


ctab(filter(data, treatment == 0), minimize.pork.t1 >= 4, gender == 2, na.rm = TRUE)
# minimize.pork.t1 >= 4 ### gender == 2 (nas removed)

#          FALSE   TRUE
#   FALSE 0.3079 0.5093
#   TRUE  0.6921 0.4907


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 49.095, df = 1, p-value = 2.439e-12

ctab(filter(data, treatment == 0), suffering.t1 >= 4, gender == 2, na.rm = TRUE)
# suffering.t1 >= 4 ### gender == 2 (nas removed)

#          FALSE   TRUE
#   FALSE 0.2519 0.4238
#   TRUE  0.7481 0.5762


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 109.26, df = 1, p-value < 2.2e-16

ctab(filter(data, treatment == 1), minimize.pork.t1 >= 4, gender == 2, na.rm = TRUE)
# minimize.pork.t1 >= 4 ### gender == 2 (nas removed)

#          FALSE   TRUE
#   FALSE 0.1680 0.3011
#   TRUE  0.8320 0.6989


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 461.72, df = 1, p-value < 2.2e-16

ctab(filter(data, treatment == 1), suffering.t1 >= 4, gender == 2, na.rm = TRUE)
# suffering.t1 >= 4 ### gender == 2 (nas removed)

#          FALSE   TRUE
#   FALSE 0.1515 0.2679
#   TRUE  0.8485 0.7321


#         Pearson's Chi-squared test with Yates' continuity correction

# data:  x and y
# X-squared = 530.91, df = 1, p-value < 2.2e-16
browser()
