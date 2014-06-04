## Read CSV
setwd("Documents/Action/Programming/R/ACE")
leaflets <- read.csv("leaflets.csv")
attach(leaflets)


## Total Meat Elimination
recent_meats <- red + poultry + fish             # Total "ranks" now (higher = less meat eating)
recent_meats3 <- red.1 + poultry.1 + fish.1      # Total "ranks" three months ago (higher = less meat eating)
                                                 # ..Scale is 3 - 21 (21 is none, 3 is as much as is measured)

length(recent_meats); length(recent_meats3)      # Get size of variables
meat_elim <- rep(NA, 623)                        # Start meat change variable by making it the same size
meat_elim[recent_meats3 < 21 & recent_meats == 21] <- 1   # Code as 1 if meat is eliminated between times
meat_elim[recent_meats3 < 21 & recent_meats < 21] <- 0    # Code as 0 if no elimination between times
meat_elim[recent_meats3 == 21 & recent_meats == 21] <- 0  # Code as 0 if already vegatarian at beginning
meat_elim[recent_meats3 == 21 & recent_meats < 21] <- -1  # Code as -1 if meat is added
table(meat_elim)

# ~100 respondents disappeared, let's see what happened
table(recent_meats, recent_meats3, exclude = NULL)       # Looks like we have some NAs, so we're good


## Meat Reduction
meat_reduce <- rep(NA, 623)                      # Start meat change variable by making it the same size
meat_reduce[recent_meats3 < recent_meats] <- 1            # Code as 1 if meat is reduced between times
meat_reduce[recent_meats3 == recent_meats] <- 0           # Code as 0 if no reduction between times
meat_reduce[recent_meats3 > recent_meats] <- -1           # Code as -1 if meat is increased
table(meat_reduce)


# Total Red Meat Elimination
length(red); length(red.1)                       # Get size of variables
red_drop <- rep(NA, 623)                         # Start meat change variable by making it the same size
red_drop[red.1 < 7 & red == 7] <- 1              # Code as 1 if red meat is eliminated between times
red_drop[red.1 < 7 & red < 7] <- 0               # Code as 0 if no red meat elimination between times
red_drop[red.1 == 7 & red == 7] <- 0             # Code as 0 if already red meat free at beginning
red_drop[red.1 == 7 & red < 7] <- -1             # Code as -1 if meat is added
table(red_drop)


# Total Poultry Elimination
length(poultry); length(poultry.1)               # Get size of variables
poultry_drop <- rep(NA, 623)                     # Start change variable by making it the same size
poultry_drop[poultry.1 < 7 & poultry == 7] <- 1         # Code as 1 if poultry is eliminated between times
poultry_drop[poultry.1 < 7 & poultry < 7] <- 0          # Code as 0 if no poultry elimination between times
poultry_drop[poultry.1 == 7 & poultry == 7] <- 0        # Code as 0 if already poultry free at beginning
poultry_drop[poultry.1 == 7 & poultry < 7] <- -1        # Code as -1 if is added
table(poultry_drop)


## Change in Vegetarian / Vegan Status
veget[is.na(veget)] <- 0                      # 1 is vegetarian, 0 not vegetarian
vegan[is.na(vegan)] <- 0                      # 1 is vegan, 0 not vegan
veget3 <- veget.1
vegan3 <- vegan.1
veget3[is.na(veget3)] <- 0                      # 1 is vegetarian, 0 not vegetarian
vegan3[is.na(vegan3)] <- 0                      # 1 is vegan, 0 not vegan
veget_change <- veget - veget3
vegan_change <- vegan - vegan3
veg_change <- veget_change + vegan_change
veg_change[veg_change > 1] <- 1

table(vegan3, vegan, veget, veget3)


## Change in Pescatarian / Meat Reduction Status
pesce[is.na(pesce)] <- 0                  # 1 is pescearian, 0 not pescearian
m.r[is.na(m.r)] <- 0                      # 1 is meat reducer, 0 not meat reducer
pesce3 <- pesce.1
m.r3 <- m.r.1
pesce3[is.na(pesce3)] <- 0                # 1 is pescearian, 0 not pescearian
m.r3[is.na(m.r3)] <- 0                    # 1 is meat reducer, 0 not meat reducer
pesce_change <- pesce - pesce3
mr_change <- m.r - m.r3

table(m.r3, m.r, pesce, pesce3)


## How much meat do vegans / vegetarians eat?
r_anproducts <- recent_meats + dairy + eggs   # Get all animal products
recent_meatsr <- 21 - recent_meats            # Reverse code recent meats
r_anproducts_r <- 35 - r_anproducts           # Reverse code animal products
red_r <- 7 - red                              # Reverse code red meat

summary(red_r[veget == 0 & vegan == 0])
summary(red_r[veget == 1 & vegan == 0])
summary(red_r[vegan == 1])

summary(recent_meatsr[veget == 0 & vegan == 0])
summary(recent_meatsr[veget == 1 & vegan == 0])
summary(recent_meatsr[vegan == 1])

summary(r_anproducts_r[veget == 0 & vegan == 0])
summary(r_anproducts_r[veget == 1 & vegan == 0])
summary(r_anproducts_r[vegan == 1])

## Pescetarian vs. FFQ check
table(red_drop, poultry_drop, pesce_change)                          # Changed
table(pesce[red == 7 & red.1 == 7 & poultry == 7 & poultry.1 == 7])  # Always pescetarian

## Flyer Received

A1 <- A
B1 <- B
C1 <- C
D1 <- D
E1 <- E

# Make it zero for did not receive leaflet rather than NA
A1[is.na(A1)] <- 0
B1[is.na(B1)] <- 0
C1[is.na(C1)] <- 0
D1[is.na(D1)] <- 0
E1[is.na(E1)] <- 0

# Name leaflets
cbtc <- A1                   # Cruelty Behind the Cuteness (control flyer)
eiylm <- B1+D1               # Even if You Like Meat (treatment flyer)
cc <- C1                     # Compassionate Choices (treatment flyer)
fail <- E1                   # Fictional cat flyer

f_control <- cbtc                    # Control leaflet
f_treat <- eiylm + cc                # Treatment leaflets
f_all <- f_control + f_treat         # All leaflets
f_none <- rep(0, length(f_control))  # No leaflet

eiylm[eiylm > 1] <- 1                # Only record binary
f_treat[f_treat > 1] <- 1
f_all[f_all > 1] <- 1

f_control[f_treat == 1] <- NA   # Get those who received treatment out of control group

f_none[f_all == 0] <- 1         # Those who did not receive any leaflet


## IVs and DVs
table(meat_elim, f_treat)
table(meat_elim, f_control)
table(meat_elim, f_none)

table(meat_reduce, f_treat)
table(meat_reduce, f_control)
table(meat_reduce, f_none)

table(red_drop, f_treat)
table(red_drop, f_control)
table(red_drop, f_none)

table(poultry_drop, f_treat)
table(poultry_drop, f_control)
table(poultry_drop, f_none)

table(veg_change, f_treat)
table(veg_change, f_control)
table(veg_change, f_none)

table(pesce_change, f_treat)
table(pesce_change, f_control)
table(pesce_change, f_none)

table(mr_change, f_treat)
table(mr_change, f_control)
table(mr_change, f_none)

## T-tests
t.test(meat_elim ~ f_treat) 
t.test(meat_elim ~ f_treat, subset=f_all == T)

t.test(meat_reduce ~ f_treat) 
t.test(meat_reduce ~ f_treat, subset=f_all == T)

t.test(red_drop ~ f_treat) 
t.test(red_drop ~ f_treat, subset=f_all == T)

t.test(poultry_drop ~ f_treat) 
t.test(poultry_drop ~ f_treat, subset=f_all == T)

t.test(veg_change ~ f_treat) 
t.test(veg_change ~ f_treat, subset=f_all == T)

t.test(pesce_change ~ f_treat) 
t.test(pesce_change ~ f_treat, subset=f_all == T)

t.test(mr_change ~ f_treat) 
t.test(mr_change ~ f_treat, subset=f_all == T)


## Read leaflet
read_f <- 4-response                # Higher means read more of it
table(read_f[eiylm == 1])
table(read_f[cc == 1])
table(read_f[cbtc == 1])
table(read_f[E == 1])
table(read_f[f_none == 1])
table(read_f[f_treat == 1], veg_change[f_treat == 1])
table(read_f[f_treat == 1], red_drop[f_treat == 1])

t.test(read_f[is.na(f_control) == F] ~ f_control[is.na(f_control) == F], subset=f_all == T)
t.test(read_f ~ f_treat, subset=f_all == T)


## Leaflet influence?
influenced <- 6-response.1          # Higher means more influence
table(influenced[eiylm == 1])
table(influenced[cc == 1])
table(influenced[cbtc == 1])
table(influenced[E == 1])
table(influenced[f_none == 1])
table(influenced[f_treat == 1], veg_change[f_treat == 1])
table(influenced[f_treat == 1], red_drop[f_treat == 1])


## Why changed?
health.me[is.na(health.me)] <- 0     # Health (my idea)
health.doc[is.na(health.doc)] <- 0   # Health (doctor's idea)
allergy[is.na(allergy)] <- 0         # Allergies
environ[is.na(environ)] <- 0         # Environment
animal[is.na(animal)] <- 0           # Animal Cruelty
social[is.na(social)] <- 0           # Social reasons
ethical[is.na(ethical)] <- 0         # Ethical reasons
taste[is.na(taste)] <- 0             # Taste
cost[is.na(cost)] <- 0               # Cost
conven[is.na(conven)] <- 0           # Convenience

table(animal[f_treat == 1], ethical[f_treat == 1], veg_change[f_treat == 1])
table(animal[f_treat == 1], ethical[f_treat == 1], veg_change[f_treat == 1], influenced[f_treat == 1])

table(animal[f_treat == 1], ethical[f_treat == 1], red_drop[f_treat == 1])
table(animal[f_treat == 1], ethical[f_treat == 1], red_drop[f_treat == 1], influenced[f_treat == 1])
