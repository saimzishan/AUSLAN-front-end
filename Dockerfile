FROM curvetomorrow/auslan-dev-image:v7.6-debug

# Define where the application will live inside the image
ENV RAILS_ROOT /var/www/booking-system-frontend

# Set our working directory inside the image
WORKDIR $RAILS_ROOT

ADD . .