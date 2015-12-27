class EnsureTestServers
  include ProcessHelper

  def self.check_test_servers
    return if @checked_test_env
    check_webpack(:client)
    check_webpack(:server)
    check_dev_client
  end

  def self.check_webpack(type)
    process("pgrep -fl '\\-w \\-\\-config webpack\\.#{type}\\.rails\\.build\\.config\\.js'")
  rescue
    raise "webpack not running for '#{type}'', run bin/start-spec'"
  end

  def self.check_dev_client
    process("pgrep -fl 'server-rails-hot'")
  rescue
    raise "dev client not running, run bin/start-spec'"
  end
end
