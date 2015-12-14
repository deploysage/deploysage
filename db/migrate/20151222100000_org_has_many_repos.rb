# :nodoc:
class OrgHasManyRepos < ActiveRecord::Migration
  def change
    add_column :repos, :org_id, :integer
  end
end
