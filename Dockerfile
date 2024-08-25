# https://github.com/shelfio/libreoffice-lambda-base-image
FROM public.ecr.aws/shelf/lambda-libreoffice-base:7.6-node20-x86_64

# added extra to be able to fo DOCX converstion
RUN dnf install java-11-amazon-corretto -y

COPY ./ ${LAMBDA_TASK_ROOT}/

RUN npm install

CMD ["index.handler"]