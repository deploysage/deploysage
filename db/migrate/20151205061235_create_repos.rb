# :nodoc:
class CreateRepos < ActiveRecord::Migration
  def change
    create_table :repos do |t|
      t.integer :github_identifier, null: false
      t.string :url, null: false
      t.timestamps null: false
    end
  end
end
