-- AddForeignKey
ALTER TABLE "AdminOnVersion" ADD CONSTRAINT "AdminOnVersion_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
