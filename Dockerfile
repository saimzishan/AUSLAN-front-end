FROM curvetomorrow/auslan-dev-image:v7.6-debug

# Define where the application will live inside the image
ENV RAILS_ROOT /var/www/app

# Create application home. App server will need the pids dir
RUN mkdir -p $RAILS_ROOT/tmp/pids

# Set our working directory inside the image
WORKDIR $RAILS_ROOT

ADD . .