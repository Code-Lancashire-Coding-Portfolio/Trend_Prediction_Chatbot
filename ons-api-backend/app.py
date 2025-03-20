from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import time
import json  # For pretty printing

app = Flask(__name__)
CORS(app)

# Mock LLM Function (replace with actual Llama integration)
def query_llm(user_message, context=None):
    """
    Query the LLM for a response. In production, replace with actual LLM API call.
    """
    print(f"LLM received message: '{user_message}'")
    print(f"LLM received context: {json.dumps(context, indent=2)}")
    
    # Simulate LLM thinking time
    time.sleep(0.5)  # Reduced for faster testing
    
    # Simple keyword-based response for demonstration
    message_lower = user_message.lower()
    print(f"Checking keywords in lowercase message: '{message_lower}'")
    
    # Check for all keywords and print what was found (for debugging)
    keywords = {
        "demographic": "demographic" in message_lower or "demographics" in message_lower,
        "age": "age" in message_lower,
        "population": "population" in message_lower,
        "recruitment": "recruitment" in message_lower,
        "hiring": "hiring" in message_lower,
        "talent": "talent" in message_lower,
        "skill": "skill" in message_lower,
        "region": "region" in message_lower,
        "area": "area" in message_lower,
        "location": "location" in message_lower,
        "city": "city" in message_lower
    }
    
    found_keywords = [k for k, v in keywords.items() if v]
    print(f"Keywords found: {found_keywords}")
    
    # Changing the order: check for demographic keywords first
    if keywords["demographic"] or keywords["age"]:
        print("Detected as: demographics")
        return {
            "response": "Let me analyze demographic trends based on ONS data.",
            "data_needed": "demographics",
            "params": context
        }
    elif keywords["region"] or keywords["area"] or keywords["location"] or keywords["city"]:
        print("Detected as: regions")
        return {
            "response": "I'll examine regional workforce trends based on ONS data.",
            "data_needed": "regions",
            "params": context
        }
    elif keywords["skill"]:
        print("Detected as: skills")
        return {
            "response": "I'll check the skills forecast using ONS data.",
            "data_needed": "skills",
            "params": context
        }
    elif keywords["recruitment"] or keywords["hiring"] or keywords["talent"]:
        print("Detected as: recruitment")
        return {
            "response": "Let me analyze recruitment trends based on ONS data.",
            "data_needed": "recruitment",
            "params": context
        }
    else:
        print("Detected as: general")
        return {
            "response": "I can provide information on business trends using ONS data. Could you ask about recruitment, skills, demographics, or regional trends?",
            "data_needed": "recruitment",  # Default to recruitment data for demonstration
            "params": context  # Pass the entire context anyway
        }

# ONS Data Functions
def get_ons_data(data_type, params={}):
    """
    Get data from ONS API. For now, returns mock data.
    In production, implement actual ONS API calls.
    """
    # Extract industry and location from params
    industry = params.get('industry', 'Technology')
    location = params.get('location', 'London')
    
    print(f"get_ons_data received: data_type={data_type}, industry={industry}, location={location}")
    
    # Mock data functions from previous example
    if data_type == "recruitment":
        return get_mock_recruitment_data(industry, location)
    elif data_type == "skills":
        return get_mock_skills_data(industry)
    elif data_type == "demographics":
        return get_mock_demographic_data(industry, location)
    elif data_type == "regions":
        return get_mock_regional_data(industry)
    # Add other data types...
    else:
        return get_mock_recruitment_data(industry, location)  # Default

# Mock data functions here (same as previous example)
def get_mock_recruitment_data(industry, location):
    print(f"Creating mock recruitment data for {industry} in {location}")
    # Example usage of parameters
    return {"industry": industry, "location": location, "data": "Mock recruitment data"}

def get_mock_skills_data(industry):
    # Example usage of parameter
    return {"industry": industry, "data": "Mock skills data"}

def get_mock_demographic_data(industry, location):
    print(f"Creating mock demographic data for {industry} in {location}")
    return {"industry": industry, "location": location, "data": "Mock demographic data"}

def get_mock_regional_data(industry):
    return {"industry": industry, "data": "Mock regional data"}

def format_recruitment_chart(data):
    industry = data.get('industry', 'Technology')
    location = data.get('location', 'London')
    
    print(f"Formatting recruitment chart for {industry} in {location}")
    
    # You can customize data values based on location
    location_growth_rates = {
        'London': [100, 105, 110, 115, 120],
        'Manchester': [100, 108, 116, 125, 135],
        'Birmingham': [100, 106, 113, 120, 128],
        'Edinburgh': [100, 107, 115, 123, 132]
    }
    
    location_demand_rates = {
        'London': [100, 108, 118, 130, 142],
        'Manchester': [100, 110, 122, 135, 150],
        'Birmingham': [100, 107, 115, 124, 134],
        'Edinburgh': [100, 109, 120, 132, 145]
    }
    
    # Use the location-specific data or default to London
    supply_data = location_growth_rates.get(location, location_growth_rates['London'])
    demand_data = location_demand_rates.get(location, location_demand_rates['London'])
    
    return {
        "title": f"{industry} Recruitment Trends in {location}",
        "labels": ["2025", "2026", "2027", "2028", "2029"],
        "datasets": [
            {
                "label": "Workforce Supply",
                "data": supply_data,
                "borderColor": "rgb(75, 192, 192)",
                "backgroundColor": "rgba(75, 192, 192, 0.5)"
            },
            {
                "label": "Workforce Demand",
                "data": demand_data,
                "borderColor": "rgb(255, 99, 132)",
                "backgroundColor": "rgba(255, 99, 132, 0.5)"
            }
        ]
    }

def format_skills_chart(data):
    industry = data.get('industry', 'Technology')
    
    # Customized data based on industry
    industry_skill_data = {
        'Technology': {
            'Data Analysis': [100, 120, 150, 190, 230],
            'AI/ML': [100, 140, 190, 250, 310],
            'Cybersecurity': [100, 130, 170, 220, 290]
        },
        'Finance': {
            'Data Analysis': [100, 115, 135, 160, 190],
            'Risk Management': [100, 110, 125, 145, 170],
            'FinTech': [100, 125, 160, 210, 270]
        },
        'Healthcare': {
            'Healthcare IT': [100, 130, 170, 220, 280],
            'Patient Care': [100, 110, 120, 135, 155],
            'Telehealth': [100, 150, 210, 280, 360]
        },
        'Retail': {
            'E-commerce': [100, 125, 155, 190, 230],
            'Supply Chain': [100, 115, 135, 160, 190],
            'Digital Marketing': [100, 130, 170, 220, 280]
        }
    }
    
    # Default to Technology if industry not found
    industry_data = industry_skill_data.get(industry, industry_skill_data['Technology'])
    
    # Create datasets from the industry data
    datasets = []
    colors = [
        ['rgb(255, 99, 132)', 'rgba(255, 99, 132, 0.5)'],
        ['rgb(53, 162, 235)', 'rgba(53, 162, 235, 0.5)'],
        ['rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.5)']
    ]
    
    for i, (skill, values) in enumerate(industry_data.items()):
        color_idx = i % len(colors)
        datasets.append({
            "label": skill,
            "data": values,
            "borderColor": colors[color_idx][0],
            "backgroundColor": colors[color_idx][1]
        })
    
    return {
        "title": f"{industry} Skills Demand Projection",
        "labels": ["2025", "2026", "2027", "2028", "2029"],
        "datasets": datasets
    }

def format_demographic_chart(data):
    industry = data.get('industry', 'Technology')
    location = data.get('location', 'London')
    
    print(f"Formatting demographic chart for {industry} in {location}")
    
    # Age groups
    age_groups = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+']
    
    # Current distribution varies by location
    current_distributions = {
        'London': [18, 32, 25, 15, 8, 2],
        'Manchester': [20, 30, 23, 16, 9, 2],
        'Birmingham': [17, 28, 26, 18, 9, 2],
        'Edinburgh': [16, 29, 27, 17, 9, 2]
    }
    
    # Future distribution varies by location
    future_distributions = {
        'London': [19, 36, 24, 12, 7, 2],
        'Manchester': [22, 33, 22, 14, 7, 2],
        'Birmingham': [18, 31, 25, 16, 8, 2],
        'Edinburgh': [17, 32, 26, 15, 8, 2]
    }
    
    current = current_distributions.get(location, current_distributions['London'])
    future = future_distributions.get(location, future_distributions['London'])
    
    return {
        "title": f"Age Demographic Projections for {industry} in {location}",
        "labels": age_groups,
        "datasets": [
            {
                "label": "2025",
                "data": current,
                "borderColor": 'rgb(255, 99, 132)',
                "backgroundColor": 'rgba(255, 99, 132, 0.5)'
            },
            {
                "label": "2028 (Projected)",
                "data": future,
                "borderColor": 'rgb(53, 162, 235)',
                "backgroundColor": 'rgba(53, 162, 235, 0.5)'
            }
        ]
    }

def format_regional_chart(data):
    industry = data.get('industry', 'Technology')
    
    # Different growth indices for different industries
    regional_growth = {
        'Technology': {
            'regions': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds'],
            'growth': [105, 127, 118, 115, 124, 106]
        },
        'Finance': {
            'regions': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds'],
            'growth': [110, 115, 108, 120, 114, 105]
        },
        'Healthcare': {
            'regions': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds'],
            'growth': [108, 118, 122, 112, 115, 110]
        },
        'Retail': {
            'regions': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Leeds'],
            'growth': [102, 115, 112, 108, 118, 110]
        }
    }
    
    industry_data = regional_growth.get(industry, regional_growth['Technology'])
    
    return {
        "title": f"Regional Workforce Growth Index for {industry}",
        "labels": industry_data['regions'],
        "datasets": [{
            "label": "Skilled Workforce Growth Index",
            "data": industry_data['growth'],
            "borderColor": 'rgb(53, 162, 235)',
            "backgroundColor": 'rgba(53, 162, 235, 0.5)'
        }]
    }

def generate_insight(data, data_type):
    # Generate insights based on data type
    if data_type == "recruitment":
        location = data['location']
        industry = data['industry']
        
        location_insights = {
            'London': f"the {industry} sector in London is projected to see moderate growth but with increasing competition for talent",
            'Manchester': f"the {industry} sector in Manchester is experiencing rapid growth, with demand outpacing supply",
            'Birmingham': f"the {industry} sector in Birmingham shows steady growth with a balanced talent market",
            'Edinburgh': f"the {industry} sector in Edinburgh is growing quickly with high demand for specialized roles"
        }
        
        return location_insights.get(location, f"the {industry} sector in {location} is projected to see growth in demand for skilled workers")
    
    elif data_type == "skills":
        industry = data['industry']
        industry_insights = {
            'Technology': f"the most in-demand skills in the Technology sector will be AI/ML, cybersecurity, and cloud engineering",
            'Finance': f"the most in-demand skills in the Finance sector will be data analysis, regulatory compliance, and fintech expertise",
            'Healthcare': f"the most in-demand skills in the Healthcare sector will be healthcare IT, telehealth, and medical data analysis",
            'Retail': f"the most in-demand skills in the Retail sector will be e-commerce, supply chain management, and digital marketing"
        }
        
        return industry_insights.get(industry, f"the most in-demand skills in the {industry} sector will show significant growth")
    
    elif data_type == "demographics":
        location = data['location']
        industry = data['industry']
        
        demographic_insights = {
            'London': f"the workforce in the {industry} sector in London is shifting younger, with a 4% increase in the 25-34 age group expected by 2028",
            'Manchester': f"Manchester's {industry} sector is seeing a significant youth influx, with the 18-24 and 25-34 age groups growing by 2% and 3% respectively",
            'Birmingham': f"Birmingham's {industry} workforce is becoming more balanced across age groups, with moderate growth in younger demographics",
            'Edinburgh': f"Edinburgh is attracting more mid-career professionals in the {industry} sector, with growth focused in the 25-44 age range"
        }
        
        return demographic_insights.get(location, f"the age demographics in the {industry} sector in {location} are shifting toward younger workers")
    
    elif data_type == "regions":
        industry = data['industry']
        
        regional_insights = {
            'Technology': f"Manchester and Bristol show the strongest growth potential for Technology companies, with workforce growth indices of 127 and 124 respectively",
            'Finance': f"Edinburgh and London remain the strongest regions for Finance sector growth, with indices of 120 and 110",
            'Healthcare': f"Birmingham and Manchester are showing the highest potential for Healthcare expansion, with indices of 122 and 118",
            'Retail': f"Bristol and Manchester are the most promising regions for Retail expansion, with growth indices of 118 and 115"
        }
        
        return regional_insights.get(industry, f"several regions show promising growth potential for {industry} companies, particularly Manchester and Bristol")
    
    else:
        return "the trends show positive growth overall"

# Main endpoint for chatbot
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        print(f"Raw request data: {json.dumps(data, indent=2)}")
        
        user_message = data.get('message', '')
        company_context = data.get('companyContext', {})
        
        # Debug logging
        print(f"Received request - Message: {user_message}")
        print(f"Company Context: {company_context}")
        print(f"Location specified: {company_context.get('location', 'Not provided')}")
        
        # 1. Query LLM to understand the question and determine data needs
        llm_response = query_llm(user_message, company_context)
        print(f"LLM response: {json.dumps(llm_response, indent=2)}")
        
        response_data = {
            "message": llm_response["response"],
            "chartData": None
        }
        
        # 2. If LLM indicates data is needed, fetch from ONS
        if llm_response["data_needed"]:
            # Get data and create visualization
            data = get_ons_data(llm_response["data_needed"], llm_response["params"])
            print(f"ONS data: {json.dumps(data, indent=2)}")
            
            if data:
                # Format data for charts based on type
                if llm_response["data_needed"] == "recruitment":
                    # Format recruitment data for chart
                    chart_data = format_recruitment_chart(data)
                elif llm_response["data_needed"] == "skills":
                    # Format skills data for chart
                    chart_data = format_skills_chart(data)
                elif llm_response["data_needed"] == "demographics":
                    # Format demographic data for chart
                    chart_data = format_demographic_chart(data)
                elif llm_response["data_needed"] == "regions":
                    # Format regional data for chart
                    chart_data = format_regional_chart(data)
                # Add other types...
                else:
                    chart_data = format_recruitment_chart(data)  # Default to recruitment
                
                print(f"Generated chart data title: {chart_data.get('title', 'No title')}")
                response_data["chartData"] = chart_data
                
                # Enhance LLM response with specific insights from data
                if chart_data:
                    insight = generate_insight(data, llm_response['data_needed'])
                    print(f"Generated insight: {insight}")
                    response_data["message"] += f" Based on the data, I can see that {insight}."
        
        print(f"Final response: {json.dumps(response_data, indent=2)}")
        return jsonify(response_data)
    
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print full traceback for debugging
        return jsonify({
            "message": f"I encountered an error while processing your request: {str(e)}",
            "chartData": None
        })

# Add health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

# Run the Flask app
if __name__ == '__main__':
    print("Starting Flask API on http://localhost:5000")
    app.run(debug=True, port=5000)