# :nodoc:
class CreateOrgs < ActiveRecord::Migration
  def change
    create_table :orgs do |t|
      t.string :name,  null: false
      t.timestamps null: false
    end
  end
end
