import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# Define Initial Conditions & Parameters
T_initial = 42    # Initial room temperature (°C)
T_target = 26     # Target comfortable temperature (°C)
T_ambient = 30    # Outside temperature (°C)
k_ac = 0.05       # Cooling constant for Air Conditioner
k_fan = 0.02      # Cooling constant for Electric Fan
t_max = 3600      # Simulation time in seconds (1 hour)

# Define the Cooling Model (Differential equation for Newton's Law of Cooling)
def cooling_model(t, T, k):
    return -k * (T - T_ambient)

# Solve the cooling equations using solve_ivp
t_eval = np.linspace(0, t_max, 300)  # Time points for evaluation

ac_solution = solve_ivp(cooling_model, [0, t_max], [T_initial], args=(k_ac,), t_eval=t_eval)
fan_solution = solve_ivp(cooling_model, [0, t_max], [T_initial], args=(k_fan,), t_eval=t_eval)

# Extract temperature values
t_minutes = t_eval / 60  # Convert time to minutes
T_ac = ac_solution.y[0]  # AC temperature curve
T_fan = fan_solution.y[0]  # Fan temperature curve

# Plot the results
plt.figure(figsize=(8,5))
plt.plot(t_minutes, T_ac, 'b-', linewidth=2, label='Air Conditioner')
plt.plot(t_minutes, T_fan, 'r--', linewidth=2, label='Electric Fan')
plt.axhline(y=T_target, color='g', linestyle=':', label="Target Temp (26°C)")

plt.xlabel('Time (minutes)')
plt.ylabel('Room Temperature (°C)')
plt.title('Room Cooling Simulation in Extreme Heat (42°C)')
plt.legend()
plt.grid(True)
plt.show()
