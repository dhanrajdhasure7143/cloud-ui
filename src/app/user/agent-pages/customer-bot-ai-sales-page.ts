import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-bot-ai-sales-page',
  templateUrl: './customer-bot-ai-sales-page.component.html',
  styleUrls: ['./customer-bot-ai-sales-page.component.scss']
})
export class CustomerBotAiSalesPageComponent {
    email:any;
    selectedAgent:any;
    agentsQuantity: number = 1;
    isYearly: boolean = true;
    selectedAgentId:any;

  heroFeatures = [
    'Instant Customer Assistance',
    'Predictive Issue Resolution',
    'Tailored Customer Interactions',
    'Custom AI for Your Support'
  ];

  keyFeatures = [
    {
      image:"assets/images/agent/sales/CS-content 1.png",
      title: 'Automated Query Handling',
      description: 'The AI interacts with customers via chat, gathering information and providing prompt, accurate responses to enhance their experience.'
    },
    {
      image:"assets/images/agent/sales/CS-content 2.png",
      title: 'RPA Integration',
      description: 'Automate tasks like onboarding and troubleshooting with minimal intervention, reducing support team workload and boosting efficiency.'
    },
    {
      image:"assets/images/agent/sales/CS-content 3.png",
      title: '24/7 Support',
      description: 'Offer continuous customer support, improving satisfaction and loyalty across time zones.'
    },
    {
      image:"assets/images/agent/sales/CS-content 4.png",
      title: 'Scalability',
      description: 'Efficiently manage growing support demands without needing more staff, maintaining high support quality.'
    }
  ];

  benefits = [
    {
      icon: 'assets/images/agent/sales/CS-reduces.svg',
      title: 'Reduced Workload',
      description: 'Automates routine queries and tasks, allowing your team to focus on complex and high-priority issues.'
    },
    {
      icon: 'assets/images/agent/sales/CS-efficiency.svg',
      title: 'Efficiency',
      description: 'Speeds up processes like customer onboarding, reducing time and effort, improving satisfaction, and accelerating the customer journey.'
    },
    {
      icon: 'assets/images/agent/sales/CS-accuracy.svg',
      title: 'Accuracy',
      description: 'Ensures consistent and accurate responses to customer inquiries, enhancing the customer experience and building trust.'
    },
    {
      icon: 'assets/images/agent/sales/CS-scal.svg',
      title: 'Scalability',
      description: 'Manages growing support demands efficiently without additional staffing costs, handling peak times and growth effectively.'
    },
    {
      icon: 'assets/images/agent/sales/CS-satisfaction.svg',
      title: 'Customer Satisfaction',
      description: 'Improves satisfaction and loyalty by providing timely and accurate support, encouraging repeat customers and brand advocacy.'
    }
  ];

  workingSteps = [
    {
      icon: 'assets/images/agent/sales/bell-icon.svg',
      title: 'Subscribe Easily',
      description: 'Begin with a straightforward subscription—no hidden fees or complications.'
    },
    {
      icon: 'assets/images/agent/sales/preferences.svg',
      title: 'Set Your Preferences',
      description: 'Customize the AI Agent’s interactions, optimizations, and communications to match your specific needs.'
    },
    {
      icon: 'assets/images/agent/sales/automate.svg',
      title: 'Automate',
      description: 'Relax as our AI Agent autonomously handles your manual customer support activities pipeline.'
    }
  ];

  constructor() { }


ngOnInit() {
}


}