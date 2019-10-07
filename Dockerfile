FROM nginx
COPY dist/aiotal /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
