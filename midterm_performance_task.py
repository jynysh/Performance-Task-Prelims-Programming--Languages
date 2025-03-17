PASSING_SCORE = 7

first_name = "Ghian Yehzia O. Breton"
age = 20 
quiz_1_score =  6

if quiz_1_score is None:
    quiz_status = None 
elif quiz_1_score >= PASSING_SCORE:
    quiz_status = True 
else:
    quiz_status = False  

student_score = 10  
print(f"Initial Score (Integer): {student_score}")

student_score = 9.5  
print(f"Updated Score (Float): {student_score}")

print("\n=== Student Information ===")
print(f"Name: {first_name}")
print(f"Age: {age}")
print(f"Quiz 1 Score: {quiz_1_score}")
print(f"Passed: {quiz_status}")
