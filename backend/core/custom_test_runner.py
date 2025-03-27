import sys

from django.test.runner import DiscoverRunner


class CustomTestRunner(DiscoverRunner):
	def run_suite(self, suite, **kwargs):
		"""
		Override run_suite to add emoji and test name output
		"""
		total_tests = suite.countTestCases()
		print(f"\n🧪 Running {total_tests} tests\n")

		original_stdout = sys.stdout
		try:
			result = super().run_suite(suite, **kwargs)

			# Print summary with emojis
			print("\n--- Test Summary ---")
			print(f"✅ Passed: {result.testsRun - len(result.failures) - len(result.errors)}")
			print(f"❌ Failed: {len(result.failures)}")
			print(f"🚨 Errors: {len(result.errors)}")

			return result

		finally:
			sys.stdout = original_stdout
			pass

	def run_test(self, test, **kwargs):
		"""
		Print the name of the test being run with a fun emoji
		"""
		test_name = f"{test.__class__.__module__}.{test.__class__.__name__}.{test._testMethodName}"
		print(f"🔍 Running: {test_name}")

		try:
			result = test(*kwargs)
			print(f"✅ Passed: {test_name}")
			return result
		except Exception as e:
			print(f"❌ Failed: {test_name}")
			raise
